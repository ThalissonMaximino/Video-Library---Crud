import { NextFunction, Request, Response } from "express";
import { client } from "./database";
import { MovieResult } from "./interfaces";

const ensureIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const queryString: string = `
    SELECT * FROM movies
    WHERE id = $1;
    `;
  const queryResult: MovieResult = await client.query(queryString, [
    req.params.id,
  ]);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({ error: "Movie not found!" });
  }
  return next();
};

const verifyMovieName = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const queryString: string = `
    SELECT *
    FROM movies
    WHERE name = $1;
    `;
  const queryResult: MovieResult = await client.query(queryString, [
    req.body.name,
  ]);

  if (queryResult.rowCount != 0) {
    return res.status(404).json({ error: "Movie already exists!" });
  }
  return next();
};

const verifyMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const { id } = req.params;

  const queryString: string = `
    SELECT * FROM movies
    WHERE id = $1;
    `;
  const queryResult: MovieResult = await client.query(queryString, [id]);
  return next();
};

export { ensureIdExists, verifyMovieName, verifyMovieExists };
