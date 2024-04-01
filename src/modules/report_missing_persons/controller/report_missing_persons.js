import faceapi from 'face-api.js';
import { Canvas, Image } from 'canvas';
faceapi.env.monkeyPatch({ Canvas, Image });
import canvas from 'canvas';
import { asyncHandler } from '../../../utils/errorHandling.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import faceModel from '../../../../DB/models/face.model.js';
import cloudinary from '../../../utils/cloudinary.js';
import Randomstring from 'randomstring';
import {
  reportMissingPersonsrModel,
} from '../../../../DB/models/report_missing_persons.model.js';
import slugify from 'slugify';
import { volunteerModel } from '../../../../DB/models/volunteer.model.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
async function LoadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models");
}
LoadModels();
async function uploadLabeledImages(images, label, id) {
  try {
    let counter = 0;
    const descriptions = [];
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = i / images.length * 100;
      console.log(`Progress = ${counter}%`);
      // Read each face and save the face descriptions in the descriptions array
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }

    // Create a new face document with the given label and save it in DB
    const createFace = new faceModel({
      label: label,
      descriptions: descriptions,
      reportMissingPersonId: id,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}
async function getDescriptorsFromDB(image) {
  // Get all the face data from mongodb and loop through each of them to read the data
  let faces = await faceModel.find();
  for (let i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (let j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    // Turn the DB face docs to
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  // Process the image for the model
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);

  // Find matching faces
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map(d =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}
export const addMissingFinder = asyncHandler(async (req, res, next) => {
  const File1 = req.files.File1.tempFilePath;
  const File2 = req.files.File2.tempFilePath;
  const File3 = req.files.File3.tempFilePath;
  const label1 = req.body.label1;
  if (!req.files || !req.files.File1 || !req.files.File2 || !req.files.File3)
    return next(new Error('Please upload all three files.', { casue: 400 }));
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.File1.tempFilePath,
    { folder: `missingPersons` }
  );
  const uniqueNumber = Randomstring.generate({
    length: 1,
    charset: 'numeric',
  });
  const Alphabetic = Randomstring.generate({
    length: 1,
    charset: 'alphabetic',
  });
  const label = slugify(`${label1}-${uniqueNumber}${Alphabetic}`);
  const reportMiss = await reportMissingPersonsrModel.create({
    userId: req.user.id,
    image: { secure_url, public_id },
    labelFaceModel: label,
    fullName: label1,
    ...req.body,
  });
  const id = reportMiss._id;

  let result = await uploadLabeledImages([File1, File2, File3], label, id);
  if (result) {
    return res.json({ success: true, message: 'Face data stored successfully' });
  } else {
    return res.json({
      success: false,
      message: 'Something went wrong, please try again.',
    });
  }
});
export const addFoundPerson = asyncHandler(async (req, res, next) => {
  const File1 = req.files.File1.tempFilePath;
  const File2 = req.files.File2.tempFilePath;
  const File3 = req.files.File3.tempFilePath;
  const label1 = req.body.label1;
  if (!req.files || !req.files.File1 || !req.files.File2 || !req.files.File3)
    return next(new Error('Please upload all three files.', { casue: 400 }));
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.files.File1.tempFilePath,
    { folder: `foundPerson` }
  );
  const uniqueNumber = Randomstring.generate({
    length: 1,
    charset: 'numeric',
  });
  const Alphabetic = Randomstring.generate({
    length: 1,
    charset: 'alphabetic',
  });
  const label = slugify(`${label1}-${uniqueNumber}${Alphabetic}`);
  const reportMiss = await volunteerModel.create({
    userId: req.user.id,
    image: { secure_url, public_id },
    labelFaceModel: label,
    fullName: label1,
    dateOfFound: Date.now(),
    ...req.body,
  });
  const id = reportMiss._id;

  let result = await uploadLabeledImages([File1, File2, File3], label, id);
  if (result) {
    return res.json({ success: true, message: 'Face data stored successfully' });
  } else {
    return res.json({
      success: false,
      message: 'Something went wrong, please try again.',
    });
  }
});
export const checkFaceMissingPerson = asyncHandler(async (req, res, next) => {
  const File1 = req.files.File1.tempFilePath;
  if (!req.files.File1) return next(new Error('Please upload file.'));
  let result = await getDescriptorsFromDB(File1);
  const searchKey = result[0].label;
  if (searchKey == 'unknown')
    return res.json({ success: false, result, missingData: 'unknown' });
  const reportMissing = await reportMissingPersonsrModel.findOne({
    labelFaceModel: searchKey,
  });
  if (reportMissing)
    return res.json({ success: true, result, keyRes: "missingPersons", missingData: reportMissing });
  const reportFound = await volunteerModel.findOne({
    labelFaceModel: searchKey,
  });
  if (reportFound)
    return res.json({ success: true, result, keyRes: "foundPersons", missingData: reportFound });
});
export const getAllMissingPersons = asyncHandler(async (req, res, next) => {
  const { page } = req.query;
  const missingPersons = await reportMissingPersonsrModel
    .find({})
    .paginate(page);
  if (!missingPersons || missingPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: missingPersons });
});
export const getAllFoundPersons = asyncHandler(async (req, res, next) => {
  const { page } = req.query;
  const foundPersons = await volunteerModel
    .find({})
    .paginate(page)
  if (!foundPersons || foundPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: foundPersons });
});
export const searchMissingPersonsWithName = asyncHandler(async (req, res, next) => {
  const { keyword, page } = req.query;
  const missingPersons = await reportMissingPersonsrModel
    .find({
      fullName: { $regex: keyword, $options: 'i' },
    })
    .paginate(page);
  if (!missingPersons || missingPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: missingPersons });
});
export const searchFoundPersonsWithName = asyncHandler(async (req, res, next) => {
  const { keyword, page } = req.query;
  const foundPersons = await volunteerModel
    .find({
      fullName: { $regex: keyword, $options: 'i' },
    })
    .paginate(page)
  if (!foundPersons || foundPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: foundPersons });
});
export const searchMissingPersonsWithArea = asyncHandler(async (req, res, next) => {
  const { country, page } = req.query;
  const missingPersons = await reportMissingPersonsrModel
    .find({
      country: { $regex: country, $options: 'i' },
    })
    .paginate(page);
  if (!missingPersons || missingPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: missingPersons });
});
export const searchFoundPersonsWithArea = asyncHandler(async (req, res, next) => {
  const { country, page } = req.query;
  const foundPersons = await volunteerModel
    .find({
      country: { $regex: country, $options: 'i' },
    })
    .paginate(page)
  if (!foundPersons || foundPersons.length === 0)
    return res.json({
      success: false,
      message: "'There were no matching search results'",
    });
  return res.json({ success: true, page, results: foundPersons });
});
export const searchMissingPersonsWithMissingSince = asyncHandler(async (req, res, next) => {
  const { year, page } = req.query;
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
  const missingPersons = await reportMissingPersonsrModel
    .find({
      dateOfLoss: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .paginate(page)
  if (missingPersons.length > 0) {
    return res.json({
      success: true,
      message: "Users lost in a year",
      results: missingPersons
    });
  } else {
    const availableMonths = await reportMissingPersonsrModel.distinct('dateOfLoss.month', {
      'dateOfLoss.year': year
    }).paginate(page)
    if (availableMonths.length > 0) {
      return res.json({
        success: true,
        message: "Available months in the selected year",
        results: availableMonths
      });
    } else {
      return res.json({
        success: false,
        message: "There are no results for this year",
        results: availableMonths
      });
    }
  }

});
export const searchFoundPersonsWithMissingSince = asyncHandler(async (req, res, next) => {
  const { year, page } = req.query;
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
  const missingPersons = await volunteerModel
    .find({
      dateOfLoss: {
        $gte: startDate,
        $lte: endDate
      }
    })
    .paginate(page)
  if (missingPersons.length > 0) {
    return res.json({
      success: true,
      message: "Users lost in a year",
      results: missingPersons
    });
  } else {
    const availableMonths = await volunteerModel.distinct('dateOfLoss.month', {
      'dateOfFound.year': year
    }).paginate(page)
    if (availableMonths.length > 0) {
      return res.json({
        success: true,
        message: "Available months in the selected year",
        results: availableMonths
      });
    } else {
      return res.json({
        success: false,
        message: "There are no results for this year",
        results: availableMonths
      });
    }
  }
});
