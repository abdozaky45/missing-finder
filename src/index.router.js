import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import cors from "cors";
const bootstrap = (app, express) => {
  // This is CORS-enabled for all origins
  app.use(cors());
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.all("*", (req, res, next) => {
    return next(new Error("page not found!", { cause: 404 }));
  });
  connectDB();
  // ErrorHandling Middleware
  app.use(globalErrorHandling);
};
export default bootstrap;
