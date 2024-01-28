import { asyncHandler } from "../../../utils/errorHandling.js";

const fetchDataFromApi = async () => {
  const response = await axios.post("http://127.0.0.1:5000", {
    finderImage,
    fullName
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
export const addFinder = asyncHandler(async (req, res) => {
  const { finderImage, fullName } = req.body;

  const data = await fetchDataFromApi(finderImage, fullName);
  res.json({ data }); // Data reception json
  // update code
  if (data.success) {
    res.json({ message: 'done' });
  } else {
    res.status(500).json({ error: 'An error occurred' });
  }
});