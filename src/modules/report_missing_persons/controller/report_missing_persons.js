import axios from "axios";
import { reportMissingPersonsrModel } from "../../../../DB/models/report_missing_persons.model.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

// const fetchDataFromApi = async finderImage => {
//   const response = await axios.post("http://127.0.0.1:5000/upload", {
//     finderImage
//   });
//   console.log(response.data);
//   return response.data; // return data flask
// };
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
export const addFinder = asyncHandler(async (req, res, next) => {
  const {
    fullNameFinder,
    finderGender,
    HealthStatus,
    Age,
    MissingPersonClassification,
    WherePersonLost,
    absenceReport,
    phone,
    relationMissingPerson,
    governorateReporter,
    stateCountry,
    ReporterAddress
  } = req.body;
  const finderImage = req.file.path;
  if (!req.file) return next(new Error("image is required", { cause: 400 }));
 // const data = await fetchDataFromApi(finderImage);
  const missingPersons = await reportMissingPersonsrModel.create({
    userId: req.user.id,
    fullNameFinder,
    finderImage: req.file.path,
    finderGender,
    HealthStatus,
    Age,
    MissingPersonClassification,
    WherePersonLost,
    absenceReport,
    phone,
    relationMissingPerson,
    governorateReporter,
    stateCountry,
    ReporterAddress
  });
  return res.json({ success: true, result: missingPersons });

  // res.json({ data }); // send data flask front End
  // update code
  // if (data.success) {
  //   return res.json({ message: "done", result: missingPersons });
  // } else {
  //   res.status(500).json({ error: "An error occurred" });
  // }
});
