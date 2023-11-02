import { AppDataSource } from "./data-source";
import * as express from "express";
import threadRoute from "./route/threadRoute";
import userRoute from "./route/userRoute";
import replyRoute from "./route/replyRoute";
import followRoute from "./route/followRoute";
import likeRoute from "./route/likeRoute";
import authRoute from "./route/authRoute";
import * as cors from "cors";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", threadRoute);
    app.use("/api/v1", userRoute);
    app.use("/api/v1", replyRoute);
    app.use("/api/v1", followRoute);
    app.use("/api/v1", likeRoute);
    app.use("/api/v1", authRoute);

    app.listen(port, () => {
      console.log(`server listening in port: ${port}`);
    });
  })
  .catch((error) => console.log(error));
