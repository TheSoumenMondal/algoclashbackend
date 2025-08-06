import submissionRouter from "./submission.routes.js";
import express from "express";

const v1Router = express.Router();

v1Router.use("/submissions", submissionRouter)




export default v1Router