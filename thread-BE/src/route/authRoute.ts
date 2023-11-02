import * as express from "express";
import authController from "../controllers/authController";
import AuthenticationMiddlewares from "../middlewares/auth";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/auth/check", AuthenticationMiddlewares.Authentication, authController.check);

export default router;
    