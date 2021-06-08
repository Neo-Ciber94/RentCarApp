import { Body, Delete, Get, Param, Post, Put } from "routing-controllers";

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
  find(): Promise<T[]> {
    return this.repository.find();
  }

  @Get("/:id")
  findById(@Param("id") id: number): Promise<T | undefined> {
    return this.repository.findById(id);
  }

  @Post()
  post(@Body() entity: R): Promise<T> {
    return this.repository.create(entity);
  }

  @Put()
  put(@Body() entity: R & { id: number }): Promise<T | undefined> {
    return this.repository.update(entity);
  }

  @Delete("/:id")
  delete(@Param("id") id: number): Promise<T | undefined> {
    return this.repository.delete(id);
  }
}
