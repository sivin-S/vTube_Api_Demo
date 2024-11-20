import mongoose from "mongoose";
import { DB_NAME } from "../constant.mjs";

const connectDB = async () => {
  try {
  await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_NAME}`
    );
    console.log('🙂 mongodb connected ✨');
  } catch (err) {
    console.log("🛑 MongoDB connection error >> ", err);
    process.exit(1);
  }
};


export default connectDB;

/*
####>> Note <<<######
      process.exit(0) => an exit code of 0 means "no errors" or "successful completion."
      process.exit(1) => This signals that the process ended with an error or failure.
      process.exit() => which signifies that the process completed successfully  ' 0 ' default.
*/
