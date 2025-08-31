import dotenv from "dotenv";
import connectDB from "./config/db";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log("my express server is working");
});
