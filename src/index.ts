import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes";
import { setupSwagger } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS
app.use(cors());

app.use(express.json());

// ✅ Setup Swagger
setupSwagger(app);

// ✅ Use Routes
app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
