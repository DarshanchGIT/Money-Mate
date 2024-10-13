const z = require("zod");

const signUpSchema = z.object({
  username: z.string().min(4).max(15),
  password: z.string().min(4),
  firstName: z.string().min(4).max(50),
  lastName: z.string().min(4).max(50),
});

const signInSchema = z.object({
  username: z.string().min(4).max(15),
  password: z.string().min(4),
});

const updateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lasstName: z.string().optional(),
});

const tranferSchema = z.object({
  amount: z.string(),
  reciever: z.string(),
});

module.exports = {
  signUpSchema,
  signInSchema,
  updateSchema,
  tranferSchema,
};
