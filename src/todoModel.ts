/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Buy groceries"
 *         completed:
 *           type: boolean
 *           example: false
 */
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}
