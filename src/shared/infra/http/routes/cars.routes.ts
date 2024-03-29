import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsCrontroller = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carsRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createCarController.handle
);

carsRoutes.get("/available", listAvailableCarsCrontroller.handle);
carsRoutes.post(
	"/specifications/:id",
	ensureAuthenticated,
	ensureAdmin,
	upload.array("images"),
	createCarSpecificationController.handle
);

carsRoutes.post(
	"/images/:id",
	ensureAuthenticated,
	ensureAdmin,
	uploadCarImagesController.handle
);

export { carsRoutes };
