import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bootstrap from "./src/index.router.js";
const app = express();
bootstrap(app, express);
const port = process.env.PORT;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
