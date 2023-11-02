import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/usersEntity";
import { Request, Response } from "express";
import { CreateUserSchema, UpdateUserSchema } from "../utils/validators/joi";
import { hashSync } from "bcrypt";

export default new (class UserService {
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async find(req: Request, res: Response) {
    try {
      const user = await this.userRepository.find();

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(500).json({ message: "error while getting user" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const user = await this.userRepository.findOne({ where: { id: id } });

      if (!user) {
        return res.status(404).send("there is no data");
      }

      const data = req.body;
      const { error } = UpdateUserSchema.validate(data);
      if (error) res.status(400).send(error.details[0].message);

      if (data.username) {
        user.username = data.username;
      }
      if (data.full_name) {
        user.full_name = data.full_name;
      }
      if (data.email) {
        user.email = data.email;
      }
      if (data.password) {
        user.password = data.password;
      }
      if (data.profile_picture) {
        user.profile_picture = data.profile_picture;
      }
      if (data.profile_description) {
        user.profile_description = data.profile_description;
      }

      const updateUser = await this.userRepository.save(user);
      return res.status(200).send(updateUser);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) {
        return res.status(404).send("there not found");
      } else {
        const deleteUser = await this.userRepository.delete({ id: id });
        return res.status(200).send({
          thread: deleteUser,
          message: "user deleted",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
})();
