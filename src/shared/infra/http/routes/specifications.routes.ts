import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
	"/",
	ensureAuthenticated,
	ensureAdmin,
	createSpecificationController.handle
);

// specificationsRoutes.post("/", (request, response) => {
// 	return createSpecificationController.handle(request, response);
// });

// specificationsRoutes.get("/", (request, response) => {
// 	const all = specificationsRepository.list();

// 	response.json(all);
// });

export { specificationsRoutes };
