import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
interface IMovie {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
}
type TRequestExpress = (req: Request, res: Response) => Promise<Response>;

type TMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<Response | void>;

type TMoviesRequest = Omit<IMovie, "id">;

type TMoviesUpdateRequest = Partial<IMovie>;

type MovieResult = QueryResult<IMovie>;

type TFormat = (text: string, listKeys: string[], listValues: any[]) => string;

export {
  IMovie,
  TMoviesRequest,
  TRequestExpress,
  TMiddleware,
  TFormat,
  MovieResult,
  TMoviesUpdateRequest,
};
