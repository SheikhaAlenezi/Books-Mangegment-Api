import express, { Router } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/book.controllers";
import upload from "../middlewares/upload";

const router = Router();

router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.delete("/:id", deleteBook);
router.post("/", upload.single("coverImage"), createBook);
router.put("/:id", upload.single("coverImage"), updateBook);

export default router;
