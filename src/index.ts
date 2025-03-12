import express from "express";
import { setupSwagger } from "./config/swagger";
import todoRoutes from "./routes/todoRoutes";

const app = express();
app.use(express.json());

// Setup Swagger documentation
setupSwagger(app);

// API routes
app.use("/api/todos", todoRoutes);

const PORT = 3001;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
