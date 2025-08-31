import { Request, Response } from "express";
import Book from "../models/Book";
import Author from "../models/Author";
import Category from "../models/Category";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find().populate("author").populate("categories");
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate("author")
      .populate("categories");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const bookData = {
      ...req.body,
      coverImage: req.file?.filename,
    };
    const newBook = new Book(bookData);
    const saved = await newBook.save();
    // author
    await Author.findByIdAndUpdate(saved.author, {
      $push: { books: saved._id },
    });
    // categories
    if (saved.categories?.length) {
      await Category.updateMany(
        { _id: { $in: saved.categories } },
        { $push: { books: saved._id } }
      );
    }
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating book" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updateData = {
      ...req.body,
      ...(req.file && { coverImage: req.file.filename }),
    };
    const updated = await Book.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Book not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating book" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book" });
  }
};
