import { Response } from "express";
import { Body, Delete, Get, Param, Post, Put, Res } from "routing-controllers";
import { handleError } from "./handleError";

export interface RepositoryLike<T, R = T> {
  find(): Promise<T[]>;
  findById(id: number): Promise<T | undefined>;
  create(entity: R): Promise<T>;
  update(entity: R): Promise<T | undefined>;
  delete(id: number): Promise<T | undefined>;
}

export abstract class ForwardController<T, R = T> {
  constructor(protected readonly repository: RepositoryLike<T, R>) {}

  @Get()
  async find(@Res() response: Response): Promise<T[] | Response<T[]>> {
    return this.repository
      .find()
      .catch((error) => handleError(error, response));
  }

  @Get("/:id")
  async findById(
    @Param("id") id: number,
    @Res() response: Response
  ): Promise<T | Response<T> | undefined> {
    return this.repository
      .findById(id)
      .catch((error) => handleError(error, response));
  }

  @Post()
  async post(
    @Body() entity: R,
    @Res() response: Response
  ): Promise<T | Response<T>> {
    return this.repository
      .create(entity)
      .catch((error) => handleError(error, response));
  }

  @Put()
  async put(
    @Body() entity: R & { id: number },
    @Res() response: Response
  ): Promise<T | Response<T> | undefined> {
    return this.repository
      .update(entity)
      .catch((error) => handleError(error, response));
  }

  @Delete("/:id")
  async delete(
    @Param("id") id: number,
    @Res() response: Response
  ): Promise<T | Response<T> | undefined> {
    return this.repository
      .delete(id)
      .catch((error) => handleError(error, response));
  }
}
