import morgan from "morgan";
import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import cors from "cors";
import finderRouter from "./modules/report_missing_persons/report_missing_persons.router.js";
const bootstrap = (app, express) => {
  if (process.env.Node_ENV === "dev") {
    app.use(morgan("dev"));
  }
  // This is CORS-enabled for all origins
  app.use(cors());
  app.use(express.json());
  app.use("/missingfinder",express.static("missingfinder"));
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/missingPersons",finderRouter);
  app.all("*", (req, res, next) => {
    return next(new Error("page not found!", { cause: 404 }));
  });
  connectDB();
  // ErrorHandling Middleware
  app.use(globalErrorHandling);
};
export default bootstrap;
