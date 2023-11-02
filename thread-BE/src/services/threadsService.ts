import { AppDataSource } from "../data-source";
import { Thread } from "../entities/threadsEntity";
import { User } from "../entities/usersEntity";
import { Repository } from "typeorm";
import { Request, Response } from "express";
import { CreateThreadSchema, UpdateThreadschema } from "../utils/validators/joi";
import { v2 as cloudinary } from "cloudinary";

export default new (class ThreadService {
  private readonly threadRepository: Repository<Thread> = AppDataSource.getRepository(Thread);
  private readonly userRepository: Repository<User> = AppDataSource.getRepository(User);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const thread = await this.threadRepository.find({
        select: {
          id: true,
          content: true,
          image: true,
          like: {
            id: true,
            user: {
              id: true,
              username: true,
            },
          },
          replies: {
            id: true,
            content: true,
            image: true,
            user: {
              id: true,
              username: true,
              full_name: true,
              profile_picture: true,
            },
          },
          user: {
            id: true,
            username: true,
            full_name: true,
            profile_picture: true,
          },
        },
        relations: {
          like: {
            user: true,
          },
          replies: {
            user: true,
          },
          user: true,
        },
      });

      return res.status(200).json({
        message: "success",
        threads: thread,
      });
    } catch (err) {
      return res.status(500).json({ message: "error while getting threads" });
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = res.locals.loginSession;
      const image = res.locals.filename;

      let imagesrc;
      const data = {
        content: req.body.content,
        image: image,
      };

      //connecting to cloudinary
      cloudinary.config({
        cloud_name: "dwuwsanew",
        api_key: "321989199898163",
        api_secret: "-NYynVZ1TiykXgnGCvr2GRyhGtM",
      });

      // upload

      if (image) {
        const cloudinaryResponse = await cloudinary.uploader.upload("src/uploads/" + image, { folder: "circle-app" });
        imagesrc = cloudinaryResponse.secure_url;
      }

      const newThreads = this.threadRepository.create({
        content: data.content,
        image: imagesrc,
        user: user.idUser,
      });
      // console.log("userUpload:", newThreads);

      const createdThread = await this.threadRepository.save(newThreads);

      return res.status(201).json(createdThread);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const thread = await this.threadRepository.findOne({ where: { id: id } });

      if (!thread) {
        return res.status(404).send("there is no found data");
      }

      const data = req.body;

      const { error } = UpdateThreadschema.validate(data);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      if (data.content) {
        thread.content = data.content;
      }
      if (data.image) {
        thread.image = data.image;
      }
      if (data.user) {
        thread.user = data.user;
      }

      const updateThread = await this.threadRepository.save(thread);
      return res.status(200).send(updateThread);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const thread = await this.threadRepository.findOne({
        where: { id: id },
        relations: ["user"],
      });
      if (!thread) {
        return res.status(404).send("there not found");
      } else {
        const deleteThread = await this.threadRepository.remove(thread);
        return res.status(200).send({
          thread: deleteThread,
          message: "thread deleted",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
})();
