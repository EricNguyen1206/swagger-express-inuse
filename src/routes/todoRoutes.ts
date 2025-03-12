import express from "express";
import { getTodos, createTodo } from "../controllers/todoController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todos
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Retrieve all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Todo"
 */
router.get("/", getTodos);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Learn Express"
 *     responses:
 *       201:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Todo"
 */
router.post("/", createTodo);

export default router;
