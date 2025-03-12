import { Request, Response } from "express";

// Temporary in-memory data storage
let todos = [
  { id: 1, title: "Learn TypeScript", completed: false },
  { id: 2, title: "Build API", completed: false },
];

// Get all todos
export const getTodos = (req: Request, res: Response) => {
  res.json(todos);
};

// Create a new todo
export const createTodo = (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = { id: todos.length + 1, title, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
};
