import express, { Application, json } from "express";
import "dotenv/config";
import { connectDatabase } from "./database";
import {
  createMovie,
  readMovies,
  updateMovie,
  deleteMovie,
  retrieveMovie,
} from "./logics";
import { ensureIdExists, verifyMovieName } from "./middlewares";

const app: Application = express();

app.use(json());

app.post("/movies", verifyMovieName, createMovie);
app.get("/movies", readMovies);
app.get("/movies/:id", retrieveMovie);
app.patch("/movies/:id", ensureIdExists, verifyMovieName, updateMovie);
app.delete("/movies/:id", ensureIdExists, deleteMovie);

const PORT: number = 3000;
const runningMsg: string = "Server running";

app.listen(PORT, async () => {
  await connectDatabase();
  console.log(runningMsg);
});
