import * as joi from "joi";

export const CreateThreadSchema = joi.object({
  content: joi.string().min(8),
  image: joi.string(),
  userId: joi.number(),
});

export const UpdateThreadschema = joi.object({
  content: joi.string().min(8),
  image: joi.string(),
});

export const CreateUserSchema = joi.object({
  full_name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().required(),
});

export const UpdateUserSchema = joi.object({
  username: joi.string(),
  full_name: joi.string(),
  email: joi.string(),
  password: joi.string(),
  profile_picture: joi.string(),
  profile_description: joi.string(),
});

export const LikesSchemaValidate = joi.object({
  user: joi.number().required(),
  thread: joi.number().required(),
});
