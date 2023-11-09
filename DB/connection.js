import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
    .connect(process.env.DB_URL)
    .then((result) => {
      console.log("DataBase Connected ----->");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDB;
