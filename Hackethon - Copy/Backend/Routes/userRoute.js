import express from "express";
import userAuth from "../middleware/userAuth.js";
import { getRegistrationID, getUserData } from "../controllers/userController.js";

const userRouter = express.Router();

// Route to fetch user data with authentication
userRouter.post("/data", userAuth, getUserData);
userRouter.post("/getRegId",getRegistrationID)

export default userRouter;
 