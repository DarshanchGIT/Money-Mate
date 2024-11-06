const { Account } = require("../../model/database");
const mongoose = require("mongoose");
const { tranferSchema } = require("../../utils/types");

const getBalance = async (req, res) => {
  const id = req.userId;

  try {
    const userBalance = await Account.findOne({ userId: id });

    if (!userBalance) {
      return res.status(404).json({
        message: "User account not found",
      });
    }

    return res.json({
      balance: userBalance.balance,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving balance",
      error: error.message,
    });
  }
};

// Transactions waala part in db
const transferFund = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const body = req.body;
    const response = tranferSchema.safeParse(body);

    if (!response.success) {
      return res.status(401).json({ message: "Invalid request body" });
    }

    const { amount, reciever } = body;
    const senderId = req.userId;

    // Check for sufficient amount of balance
    const senderAccount = await Account.findOne({ userId: senderId }).session(
      session
    );
    if (!senderAccount || senderAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const recieverAccount = await Account.findOne({ userId: reciever }).session(
      session
    );
    if (!recieverAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid receiver account",
      });
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: senderId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: reciever },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transactions
    await session.commitTransaction();
    return res.json({ message: "Funds transferred successfully" });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      message: "Error processing the transaction",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

module.exports = {
  getBalance,
  transferFund,
};
