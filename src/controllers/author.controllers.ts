import { Request, Response } from "express";
import Author from "../models/Author";

export const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Author.find().populate("books");
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching authors" });
  }
};

export const getAuthorById = async (req: Request, res: Response) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");
    if (!author) return res.status(404).json({ message: "Author not found" });
    res.json(author);
  } catch (err) {
    res.status(500).json({ message: "Error fetching author" });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const newAuthor = new Author({
      name: req.body.name,
      country: req.body.country,
    });
    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor);
  } catch (err) {
    res.status(400).json({ message: "Error creating author" });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const updated = await Author.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Author not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating author" });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const deleted = await Author.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Author not found" });
    res.json({ message: "Author deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting author" });
  }
};
