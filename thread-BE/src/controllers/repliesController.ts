import { Response, Request } from "express";
import replyService from "../services/replyService";

export default new (class replyController {
  find(req: Request, res: Response) {
    replyService.find(req, res);
  }
  create(req: Request, res: Response) {
    replyService.create(req, res);
  }
  update(req: Request, res: Response) {
    replyService.update(req, res);
  }
  delete(req: Request, res: Response) {
    replyService.delete(req, res);
  }
})();
