import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) throw new Error("mongo uri not found");
    const { connection } = await connect(MONGO_URI);
    console.log(connection.host);
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
