import express from "express";
import { generateImage } from "../controllers/imageController.js";
import userAuth from './../middlewares/auth.js';


const imagerouter = express.Router();

imagerouter.post("/generate-image",userAuth, generateImage);

export default imagerouter;
