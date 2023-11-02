import { Entity, PrimaryGeneratedColumn, JoinColumn, UpdateDateColumn, CreateDateColumn, ManyToOne } from "typeorm";
import { Thread } from "./threadsEntity";
import { User } from "./usersEntity";

@Entity({ name: "likes" })
export class Likes {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Thread, (thread) => thread.like, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "thread_id" })
  thread: Thread[];

  @ManyToOne(() => User, (user) => user.like, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "user_id" })
  user: User[];
}
