import { Request, Response, query } from "express";
import { IMovie, MovieResult, TMoviesRequest } from "./interfaces";
import format from "pg-format";
import { client } from "./database";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: IMovie = req.body;

  const queryString: string = format(
    `
INSERT INTO movies(%I) 
VALUES(%L) 
RETURNING *;
`,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: MovieResult = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const readMovies = async (req: Request, res: Response): Promise<Response> => {
  const queryStringCategories: string = `
    SELECT * FROM movies
    WHERE category = $1;
    `;
  const queryResultCategories: MovieResult = await client.query(
    queryStringCategories,
    [req.query.category]
  );

  if (queryResultCategories.rowCount > 0) {
    return res.status(200).json(queryResultCategories.rows);
  }

  const queryStringAll: string = `SELECT * FROM movies;`;
  const queryResultAll: MovieResult = await client.query(queryStringAll);
  return res.json(queryResultAll.rows);
};

const updateMovie = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMoviesRequest = req.body;

  const queryString: string = format(
    `
        UPDATE movies
        SET(%I) = ROW(%L)
        WHERE id = $1
        RETURNING*
        `,
    Object.keys(payload),
    Object.values(payload)
  );
  const queryResult: MovieResult = await client.query(queryString, [
    req.params.id,
  ]);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const queryString: string = `
    DELETE FROM movies
    WHERE id = $1
    `;

  await client.query(queryString, [req.params.id]);

  return res.status(204).send();
};

const retrieveMovie = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { id } = req.params;

  const queryStringRetrieve: string = `
    SELECT * FROM movies
    WHERE id = $1;
    `;
  const queryResultRetrieve: MovieResult = await client.query(
    queryStringRetrieve,
    [id]
  );
  if (queryResultRetrieve.rowCount === 0) {
    return res.status(404).json({ error: "Movie does not exist!" });
  }
  if (queryResultRetrieve.rowCount > 0) {
    return res.status(200).json(queryResultRetrieve.rows[0]);
  }
};

export { createMovie, readMovies, updateMovie, deleteMovie, retrieveMovie };
