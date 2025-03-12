import express, { Express, Request, Response } from "express";
import path from "path";
import fs from "fs";
import swaggerJsdoc from "swagger-jsdoc";
import { getAbsoluteFSPath } from "swagger-ui-dist";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Todo API",
      version: "1.0.0",
      description: "A simple Todo API with Swagger documentation",
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      schemas: {
        Todo: {
          type: "object",
          properties: {
            id: { type: "integer", description: "Auto-generated ID" },
            title: { type: "string", description: "Todo title" },
            completed: {
              type: "boolean",
              description: "Task completion status",
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.ts")], // Extract docs from route files
};

const swaggerSpec = swaggerJsdoc(options);

// Save Swagger JSON file to docs folder
const docsPath = path.join(__dirname, "../../docs/swagger.json");
fs.mkdirSync(path.dirname(docsPath), { recursive: true });
fs.writeFileSync(docsPath, JSON.stringify(swaggerSpec, null, 2));

export const setupSwagger = (app: Express): void => {
  const swaggerUiPath = getAbsoluteFSPath();

  // Serve static Swagger UI files
  app.use("/api-docs", express.static(swaggerUiPath));

  // Serve Swagger UI
  app.get("/api-docs", (req: Request, res: Response) => {
    res.sendFile(path.join(swaggerUiPath, "index.html"));
  });

  // Serve Swagger JSON spec
  app.get("/swagger.json", (req: Request, res: Response) => {
    res.json(swaggerSpec);
  });
};

// Generate Swagger docs when running this file directly
if (require.main === module) {
  console.log("Generating Swagger documentation...");
}
