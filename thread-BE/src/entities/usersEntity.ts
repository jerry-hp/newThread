import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { Thread } from "./threadsEntity";
import { Reply } from "./repliesEntity";
import Follow from "./followEntity";
import { Likes } from "./likeEntity";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column({ select: true })
  password: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: true })
  profile_description: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  update_at: Date;

  @OneToMany(() => Thread, (threads) => threads.user, { onUpdate: "CASCADE", onDelete: "CASCADE" })
  threads: Thread[];

  @OneToMany(() => Reply, (reply) => reply.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  replies: Reply[];

  @OneToMany(() => Follow, (follow) => follow.follower_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  follower: User[];

  @OneToMany(() => Follow, (follow) => follow.following_id, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  following: User[];

  @OneToMany(() => Likes, (like) => like.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn()
  like: Likes[];
}
