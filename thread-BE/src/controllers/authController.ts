import { Request, Response } from "express";
import authService from "../services/authService";

export default new (class AuthController {
  register(req: Request, res: Response) {
    authService.register(req, res);
  }
  login(req: Request, res: Response) {
    authService.login(req, res);
  }
  check(req: Request, res: Response) {
    authService.check(req, res);
  }
})();
