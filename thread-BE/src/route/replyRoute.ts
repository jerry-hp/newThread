import * as express from "express";
import repliesController from "../controllers/repliesController";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.get("/reply", repliesController.find);
router.post("/reply", repliesController.create);
router.patch("/reply/:id", AuthenticationMiddlewares.Authentication, repliesController.update);
router.delete("/reply/:id", repliesController.delete);

export default router;
