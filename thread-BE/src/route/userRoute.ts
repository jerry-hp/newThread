import * as express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users", userController.find);
router.patch("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

export default router;
