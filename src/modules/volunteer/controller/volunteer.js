import axios from "axios";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { volunteerModel } from "../../../../DB/models/volunteer.model.js";

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
export const addFoundPerson= asyncHandler(async (req, res, next) => {
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
 // const finderImage = req.file.path;
  if (!req.file) return next(new Error("image is required", { cause: 400 }));
 // const data = await fetchDataFromApi(finderImage);
  const missingPersons = await volunteerModel.create({
    userId: req.user.id,
    NameFoundPerson,
    MissingPersonInformation,
    ImageFoundPerson:req.file.path,
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
  return res.json({ success: true, result: missingPersons });

  // res.json({ data }); // send data flask front End
  // update code
  // if (data.success) {
  //   return res.json({ message: "done", result: missingPersons });
  // } else {
  //   res.status(500).json({ error: "An error occurred" });
  // }
});
