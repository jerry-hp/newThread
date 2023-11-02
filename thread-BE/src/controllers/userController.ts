import { Request, Response } from "express";
import usersService from "../services/usersService";

export default new (class UserController {
  find(req: Request, res: Response) {
    usersService.find(req, res);
  }
  update(req: Request, res: Response) {
    usersService.update(req, res);
  }
  delete(req: Request, res: Response) {
    usersService.delete(req, res);
  }
})();
