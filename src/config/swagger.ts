import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express, Request, Response } from "express";

const PORT = process.env.PORT ?? 3000;

// Swagger options
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "To-Do API", version: "1.0.0" },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/controllers/*.ts", "./src/todoModel.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/swagger.json', (req: Request, res: Response) => {
    res.json(swaggerSpec);
  });
}
