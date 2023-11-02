import * as express from "express";
import ThreadController from "../controllers/threadController";
import AuthenticationMiddlewares from "../middlewares/auth";
import FileUpload from "../middlewares/uploadFile";

const router = express.Router();
const UploadMiddleWare = new FileUpload("image");

router.get("/thread", ThreadController.find);
router.post("/thread", AuthenticationMiddlewares.Authentication, UploadMiddleWare.handleUpload.bind(UploadMiddleWare), ThreadController.create);
router.patch("/thread/:id", AuthenticationMiddlewares.Authentication, ThreadController.update);
router.delete("/thread/:id", AuthenticationMiddlewares.Authentication, ThreadController.delete);

export default router;
