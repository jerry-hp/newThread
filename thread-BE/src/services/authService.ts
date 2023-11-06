import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/usersEntity";
import { Request, Response } from "express";
import { hashSync, compare } from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import Follow from "../entities/followEntity";

dotenv.config();

export default new (class AuthService {
  private readonly authRepository: Repository<User> = AppDataSource.getRepository(User);

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const isCheckEmail = await this.authRepository.count({ where: { email: data.email } });
      if (isCheckEmail > 0) return res.status(400).json({ message: "email already exist" });

      //make hashing password
      data.password = hashSync(data.password, 10);

      const db_data = this.authRepository.create(data);
      this.authRepository.save(db_data);
      return res.status(200).json({ dataRegister: db_data });
    } catch (error) {
      return res.status(500).send(error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;

      const findUser = await this.authRepository.findOne({
        where: { email: data.email },
      });
      if (!findUser) return res.status(404).json({ message: "user not found" });

      console.log(findUser);
      //comparing password
      const checkPassword = await compare(data.password, findUser.password);
      if (!checkPassword) return res.status(404).json({ message: "password is wrong" });

      //membuat token
      const maxAge = 2 * 60 * 60;
      const secretKey = process.env.jwt_token_key;
      const emailUser = findUser.email;
      const idUser = findUser.id;
      const token = await jwt.sign({ emailUser, idUser }, secretKey, { expiresIn: maxAge });

      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      // console.log(findUser);

      const user = {
        id: findUser.id,
        username: findUser.username,
        full_name: findUser.full_name,
        email: findUser.email,
        profile_picture: findUser.profile_picture,
        profile_description: findUser.profile_description,
      };

      return res.status(200).json({ user, token });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  }

  async check(req: Request, res: Response): Promise<Response> {
    try {
      const loginSession = res.locals.loginSession;
      console.log({ loginSession });
      const user = await this.authRepository.findOne({
        where: {
          id: loginSession.idUser,
        },
      });

      return res.status(200).json({
        user,
        message: "You are logged in",
      });
    } catch (err) {
      return res.status(500).json({ Error: "Error while checking" });
    }
  }
})();
