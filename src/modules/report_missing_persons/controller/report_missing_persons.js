import faceapi from 'face-api.js';
import {Canvas, Image} from 'canvas';
faceapi.env.monkeyPatch ({Canvas, Image});
import canvas from 'canvas';
import {asyncHandler} from '../../../utils/errorHandling.js';
import {fileURLToPath} from 'url';
import {dirname} from 'path';
import faceModel from '../../../../DB/models/face.model.js';
import cloudinary from '../../../utils/cloudinary.js';
import Randomstring from 'randomstring';
import {
  reportMissingPersonsrModel,
} from '../../../../DB/models/report_missing_persons.model.js';
import slugify from 'slugify';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function LoadModels() {
  await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/models");
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models");
}
LoadModels();
async function uploadLabeledImages (images, label, id) {
  try {
    let counter = 0;
    const descriptions = [];
    // Loop through the images
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage (images[i]);
      counter = i / images.length * 100;
      console.log (`Progress = ${counter}%`);
      // Read each face and save the face descriptions in the descriptions array
      const detections = await faceapi
        .detectSingleFace (img)
        .withFaceLandmarks ()
        .withFaceDescriptor ();
      descriptions.push (detections.descriptor);
    }

    // Create a new face document with the given label and save it in DB
    const createFace = new faceModel ({
      label: label,
      descriptions: descriptions,
      reportMissingPersonId: id,
    });
    await createFace.save ();
    return true;
  } catch (error) {
    console.log (error);
    return error;
  }
}
async function getDescriptorsFromDB (image) {
  // Get all the face data from mongodb and loop through each of them to read the data
  let faces = await faceModel.find ();
  for (let i = 0; i < faces.length; i++) {
    // Change the face data descriptors from Objects to Float32Array type
    for (let j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array (
        Object.values (faces[i].descriptions[j])
      );
    }
    // Turn the DB face docs to
    faces[i] = new faceapi.LabeledFaceDescriptors (
      faces[i].label,
      faces[i].descriptions
    );
  }

  // Load face matcher to find the matching face
  const faceMatcher = new faceapi.FaceMatcher (faces, 0.6);

  // Read the image using canvas or other method
  const img = await canvas.loadImage (image);
  let temp = faceapi.createCanvasFromMedia (img);
  // Process the image for the model
  const displaySize = {width: img.width, height: img.height};
  faceapi.matchDimensions (temp, displaySize);

  // Find matching faces
  const detections = await faceapi
    .detectAllFaces (img)
    .withFaceLandmarks ()
    .withFaceDescriptors ();
  const resizedDetections = faceapi.resizeResults (detections, displaySize);
  const results = resizedDetections.map (d =>
    faceMatcher.findBestMatch (d.descriptor)
  );
  return results;
}
export const addMissingFinder = asyncHandler (async (req, res, next) => {
  const File1 = req.files.File1.tempFilePath;
  const File2 = req.files.File2.tempFilePath;
  const File3 = req.files.File3.tempFilePath;
  const label1 = req.body.label1;
  if (!req.files || !req.files.File1 || !req.files.File2 || !req.files.File3)
    return next (new Error ('Please upload all three files.'));
  const {secure_url, public_id} = await cloudinary.uploader.upload (
    req.files.File1.tempFilePath,
    {folder: `/missingPersons`}
  );
  const uniqueNumber = Randomstring.generate ({
    length: 1,
    charset: 'numeric',
  });
  const Alphabetic = Randomstring.generate ({
    length: 1,
    charset: 'alphabetic',
  });
  const label = slugify (`${label1}-${uniqueNumber}${Alphabetic}`);
  console.log (label);
  const reportMiss = await reportMissingPersonsrModel.create ({
    userId: req.user.id,
    image: {secure_url, public_id},
    fullNameMissing: label,
    ...req.body,
  });
  const id = reportMiss._id;

  let result = await uploadLabeledImages ([File1, File2, File3], label, id);
  if (result) {
    res.json ({success: true, message: 'Face data stored successfully'});
  } else {
    res.json ({
      success: false,
      message: 'Something went wrong, please try again.',
    });
  }
});
export const checkFace = asyncHandler (async (req, res, next) => {
  const File1 = req.files.File1.tempFilePath;
  if (!req.files.File1) return next (new Error ('Please upload file.'));
  let result = await getDescriptorsFromDB (File1);
  const fullNameMissing = result[0].label;
  if (fullNameMissing == 'unknown')
    return res.json ({success: false, result, missingData: 'unknown'});

  const reportMissing = await reportMissingPersonsrModel.findOne ({
    fullNameMissing,
  });
  return res.json ({success: true, result, missingData: reportMissing});
});
