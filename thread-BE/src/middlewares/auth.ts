import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export default new (class AuthenticationMiddlewares {
  Authentication(req: Request, res: Response, next: NextFunction): Response {
    try {
      const Authorization = req.headers.authorization;

      if (!Authorization || !Authorization.startsWith("Bearer ")) {
        return res.status(401).json({ Error: "Unauthorized" });
      }

      const token = Authorization.split(" ")[1];

      try {
        const loginSession = jwt.verify(token, "ikoKunciNyoMah");
        res.locals.loginSession = loginSession;
        
        next();
      } catch (err) {
        return res.status(401).json({ Error: "Unauthorized" });
      }
    } catch (err) {
      return res.status(500).json({ Error: "Error while authenticating" });
    }
  }
})();
