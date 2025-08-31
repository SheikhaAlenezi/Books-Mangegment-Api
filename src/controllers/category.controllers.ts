import { Request, Response } from "express";
import Category from "../models/Category";

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: "Error fetching category" });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = new Category({ name: req.body.name });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error creating category" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: "Category not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error updating category" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting category" });
  }
};
