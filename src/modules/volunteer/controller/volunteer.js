import axios from "axios";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { volunteerModel } from "../../../../DB/models/volunteer.model.js";

const fetchDataFromApi = async ImageFoundPerson => {
  const response = await axios.post("http://127.0.0.1:5000/upload", {
    finderImage
  });
  console.log(response.data);
  return response.data; // return data flask
};
/*
{
  "success": true,
  "message": "done",
  "result": {
    "username": "john_doe",
    "age": 25
  }
}
 */
export const addFoundPerson = asyncHandler(async (req, res, next) => {
  const {
    NameFoundPerson,
    MissingPersonInformation,
    FoundPersonGender,
    HealthStatus,
    Age,
    MetMissingPerson,
    governorateFoundPerson,
    stateCountryFoundPerson,
    AddressFoundPerson,
    absenceReport,
    phone,
    governorateVolunteer,
    stateCountryVolunteer,
    volunteerAddress
  } = req.body;
  const ImageFoundPerson = req.file.path;
  if (!req.file) return next(new Error("image is required", { cause: 400 }));
  const data = await fetchDataFromApi(ImageFoundPerson);
  const missingPersons = await volunteerModel.create({
    userId: req.user.id,
    NameFoundPerson,
    MissingPersonInformation,
    ImageFoundPerson: req.file.path,
    FoundPersonGender,
    HealthStatus,
    Age,
    MetMissingPerson,
    governorateFoundPerson,
    stateCountryFoundPerson,
    AddressFoundPerson,
    absenceReport,
    phone,
    governorateVolunteer,
    stateCountryVolunteer,
    volunteerAddress
  });
  if (data.result === "success") {
    return res.json({
      success: true,
      Message: "there is match between two people in terms of face",
      result: missingPersons,
      resultAiModel: data
    });
  } else {
    return res.json({
      success: false,
      Message: "no two people are identical in terms of face",
      resultAiModel: data
    });
  }
});
