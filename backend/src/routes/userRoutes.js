import express from "express";
import register from "../controllers/registerController.js";

const userRouter = express.Router();

userRouter.post("/", register);

module.exports = userRouter;

