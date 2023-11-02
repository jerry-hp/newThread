import { Request } from "express";
import { Response } from "express";
import threadsService from "../services/threadsService";

export default new (class ThreadController {
  find(req: Request, res: Response) {
    threadsService.find(req, res);
  }
  create(req: Request, res: Response) {
    threadsService.create(req, res);
  }

  update(req: Request, res: Response) {
    threadsService.update(req, res);
  }

  delete(req: Request, res: Response) {
    threadsService.delete(req, res);
  }
})();
