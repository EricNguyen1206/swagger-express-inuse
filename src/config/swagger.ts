import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const PORT = process.env.PORT ?? 3000;

// Swagger options
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "To-Do API", version: "1.0.0" },
    servers: [{ url: `http://localhost:${PORT}` }],
    components: {
      schemas: {
        Todo: {
          type: "object",
          required: ["title"],
          properties: {
            id: { type: "integer", example: 1 },
            title: { type: "string", example: "Buy groceries" },
            completed: { type: "boolean", example: false },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
