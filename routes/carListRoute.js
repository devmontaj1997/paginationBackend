import express from "express";
import { createCarList, getCar} from "../controllers/CarListController/CarListController.js";
import { carFeatureImage } from "../utiles/Multer.js";

// init route

const router = express.Router();


// create router

router.get( "/", getCar)
router.post( "/add_car",carFeatureImage, createCarList)




// export router

export default router