import { AppDataSource } from "../data-source";
import { Reply } from "../entities/repliesEntity";
import { Repository } from "typeorm";
import { Request, Response } from "express";

export default new (class ReplyService {
  private readonly replyRepository: Repository<Reply> = AppDataSource.getRepository(Reply);

  async find(req: Request, res: Response): Promise<Response> {
    try {
      const reply = await this.replyRepository.find({
        relations: {
          thread: true,
          user: true,
        },
      });

      return res.status(200).json({ reply });
    } catch (error) {
      return res.status(500).json({ message: "error while getting reply" });
    }
  }
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const data = req.body;
      console.log(data);
      const user = this.replyRepository.create(data);
      const consol = await this.replyRepository.save(user);
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);

      const reply = await this.replyRepository.findOne({ where: { id: id } });
      if (!reply) res.status(404).send("there is no found data");

      const data = req.body;

      if (data.content) {
        reply.content = data.content;
      }
      if (data.image) {
        reply.image = data.image;
      }

      const updateData = await this.replyRepository.save(reply);
      return res.status(200).json(updateData);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const reply = await this.replyRepository.findOne({
        where: { id: id },
      });
      if (!reply) {
        return res.status(404).send("there not found");
      } else {
        const deletereply = await this.replyRepository.remove(reply);
        return res.status(200).send({
          reply: deletereply,
          message: "reply deleted",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  }
})();
