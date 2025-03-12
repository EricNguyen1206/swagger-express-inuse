import fs from "fs";
import path from "path";
import csvParser from "csv-parser";
import { Todo } from "../todoModel";

const dbPath = path.join(__dirname, "../database.csv");

export function readTodos(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    const todos: Todo[] = [];
    fs.createReadStream(dbPath)
      .pipe(csvParser())
      .on("data", (row) => todos.push({ ...row, completed: row.completed === "true" }))
      .on("end", () => resolve(todos))
      .on("error", (error) => reject(error));
  });
}

export function writeTodos(todos: Todo[]): void {
  const csvData = ["id,title,completed", ...todos.map((t) => `${t.id},${t.title},${t.completed}`)].join("\n");
  fs.writeFileSync(dbPath, csvData);
}
