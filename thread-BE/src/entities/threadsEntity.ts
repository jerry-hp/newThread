import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinTable, JoinColumn } from "typeorm";
import { User } from "./usersEntity";
import { Reply } from "./repliesEntity";
import { Likes } from "./likeEntity";

@Entity({ name: "threads" })
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  posted_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @ManyToOne(() => User, (user) => user.threads)
  // @JoinColumn({ name: "user_id" }) 
  user: User;

  @OneToMany(() => Reply, (reply) => reply.thread, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Reply[];

  @OneToMany(() => Likes, (like) => like.thread)
  like: Likes[];
}
