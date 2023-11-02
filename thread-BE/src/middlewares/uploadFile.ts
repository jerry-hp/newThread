import { NextFunction, Request, Response } from "express";
import * as multer from "multer";

export default class FileUpload {
  private fileName: string;

  constructor(fileName: string) {
    this.fileName = fileName;
  }

  private storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, process.env.DESTINATION);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
    },
  });

  private uploadFile = multer({ storage: this.storage });

  public handleUpload(req: Request, res: Response, next: NextFunction) {
    this.uploadFile.single(this.fileName)(req, res, function (error: any) {
      if (error) return res.status(400).json({ error });

      res.locals.filename = req.file.filename;
      next();
    });
  }
}
