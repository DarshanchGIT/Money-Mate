const { User, Account } = require("../../model/database");
const {
  signUpSchema,
  signInSchema,
  updateSchema,
} = require("../../utils/types");
const { generateToken, decodeToken } = require("../../utils/JWTutil");

const signUp = async (req, res, next) => {
  const body = req.body;
  const response = signUpSchema.safeParse(body);
  if (!response.success) {
    return res.status(401).json({ message: "Invalid Credentials" });
  }

  try {
    const user = await User.findOne({ username: body.username });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists, try again!" });
    }

    const newUser = await User.create(body);
    const userId = newUser._id;

    //put some random balance in user's Account whenever he/she signs up
    await Account.create({
      userId: userId,
      balance: 1 + Math.random() * 10000,
    });

    //then generate a token
    const token = generateToken({ userId });

    if (!token) {
      return res.status(500).json({ message: "Error generating token" });
    }

    return res
      .status(201)
      .json({ message: "User created successfully", token });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const body = req.body;
  const response = signInSchema.safeParse(body);
  if (!response.success) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials, Try again !!" });
  }

  try {
    const user = await User.findOne({
      username: body.username,
      password: body.password,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User doesn't exist, Please sign up first" });
    }

    const userId = user._id;
    const token = await generateToken({ userId });

    if (!token) {
      return res.status(501).json({ message: "Error generating token" });
    }

    return res
      .status(200)
      .json({ message: "Successfully logged in !!", token });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const body = req.body;
  const response = updateSchema.safeParse(body);

  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Error while updating user details" });
  }

  try {
    await User.updateOne({ _id: req.userId }, body);
    return res
      .status(200)
      .json({ message: "User details updated successfully" });
  } catch (error) {
    next(error);
  }
};

const bulk = async (req, res, next) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      // $ne => select doc which is not Equal to
      _id: { $ne: req.userId },
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    const formattedUsers = users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    }));

    res.json({ user: formattedUsers });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    return res.json({
      message: "Here's user details",
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp, signIn, updateUser, bulk, me };
