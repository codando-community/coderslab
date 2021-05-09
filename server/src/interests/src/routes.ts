import { Router } from "express";

import { CreateInterestController } from "./controllers/CreateInterestController";
import { ReadInterestByIdController } from "./controllers/ReadInterestByIdController";
import { ReadAllInterestsController } from "./controllers/ReadAllInterestsController";
import { UpdateInterestController } from "./controllers/UpdateInterestController";
import { DeleteInterestController } from "./controllers/DeleteInterestController";

const router = Router();

const createInterestController = new CreateInterestController();
const readInterestByIdController = new ReadInterestByIdController();
const readAllInterestsController = new ReadAllInterestsController();
const updateInterestController = new UpdateInterestController();
const deleteInterestController = new DeleteInterestController();

router.post("/interest/create", createInterestController.handle);
router.get("/interest/read/byId/:id", readInterestByIdController.handle);
router.get("/interest/read/all", readAllInterestsController.handle);
router.put("/interest/update/:id", updateInterestController.handle);
router.delete("/interest/delete/:id", deleteInterestController.handle);

export { router };