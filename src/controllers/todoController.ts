import { Request, Response } from "express";
import { readTodos, writeTodos } from "../config/csvHelper";
import { Todo } from "../todoModel";

// Remove or replace this block
/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       $ref: "./todoModel.ts"
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags:
 *       - Todos
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Todo"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
export async function getTodos(req: Request, res: Response) {
  try {
    const todos = await readTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags:
 *       - Todos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Buy groceries"
 *     responses:
 *       201:
 *         description: Todo created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 *       409:
 *         description: Task already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Task already exists"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
export async function createTodo(req: Request, res: Response) {
  try {
    const todos = await readTodos();

    if (!req.body.title) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (todos.some((t) => t.title.toLowerCase() === req.body.title.toLowerCase())) {
      return res.status(409).json({ message: "Task already exists" });
    }

    const newTodo: Todo = {
      id: todos.length + 1,
      title: req.body.title,
      completed: false,
    };

    todos.push(newTodo);
    writeTodos(todos);

    res.status(201).json(newTodo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a single todo by ID
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the requested todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Todo not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
export async function getTodoById(req: Request, res: Response) {
  try {
    const todos = await readTodos();
    const todo = todos.find((t) => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Todo not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example:
 *               message: "Internal Server Error"
 */
export async function updateTodo(req: Request, res: Response) {
  try {
    const todos = await readTodos();
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));

    if (index === -1) return res.status(404).json({ message: "Todo not found" });

    todos[index] = { ...todos[index], ...req.body };
    writeTodos(todos);
    res.status(200).json(todos[index]);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags:
 *       - Todos
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 *         content:
 *           application/json:
 *             example:
 *               message: "Todo not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               message: "Internal Server Error"
 */
export async function deleteTodo(req: Request, res: Response) {
  try {
    const todos = await readTodos();
    const updatedTodos = todos.filter((t) => t.id !== parseInt(req.params.id));

    if (updatedTodos.length === todos.length) {
      return res.status(404).json({ message: "Todo not found" });
    }

    writeTodos(updatedTodos);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
