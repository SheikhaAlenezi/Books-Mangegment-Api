import express from "express";
import morgan from "morgan";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import authorRoutes from "./routes/author.routes";
import categoryRoutes from "./routes/category.routes";
import bookRoutes from "./routes/book.routes";
import path from "path";
const app = express();
app.use(express.json());

app.use(cors());
app.use(morgan("dev"));

// app routes here:
app.use("/authors", authorRoutes);
app.use("/categories", categoryRoutes);
app.use("/book", bookRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(errorHandler);
app.use(notFound);

// http://localhost:8000
export default app;
