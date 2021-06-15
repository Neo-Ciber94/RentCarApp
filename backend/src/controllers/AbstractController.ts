import { Response } from "express";
import { Get, Post, Put, Delete, Param, Body, Res } from "routing-controllers";
import { GenericRepository } from "src/repositories";
import { Mapper, MapperFn } from "src/utils";
import { DeepPartial, Repository } from "typeorm";
import { handleError } from "./handleError";

type ControllerOptions<
  T,
  R = T,
  TRepository extends GenericRepository<T, R> = GenericRepository<T, R>
> = {
  repository: Repository<T> | TRepository;
  mapper?: Mapper<T, R> | MapperFn<T, R>;
  relations?: string[];
};

export abstract class AbstractController<
  T,
  R = T,
  TRepository extends GenericRepository<T, R> = GenericRepository<T, R>
> {
  protected readonly repository: TRepository;

  constructor(options: ControllerOptions<T, R>) {
    if (options.repository instanceof GenericRepository) {
      this.repository = options.repository as any;
    } else {
      this.repository = new GenericRepository({
        repository: options.repository,
        mapper: options.mapper,
        relations: options.relations,
      }) as any;
    }
  }

  @Get()
  async find(@Res() response?: Response): Promise<R[] | Response> {
    return this.repository
      .find()
      .catch((error) => handleError(error, response!));
  }

  @Get("/:id")
  async findById(
    @Param("id") id: number,
    @Res() response?: Response
  ): Promise<R | Response<R> | undefined> {
    return this.repository
      .findById(id)
      .catch((error) => handleError(error, response!));
  }

  @Post()
  async post(
    @Body() entity: DeepPartial<T>,
    @Res() response?: Response
  ): Promise<R | Response<R>> {
    return this.repository
      .create(entity)
      .catch((error) => handleError(error, response!));
  }

  @Put()
  async put(
    @Body() entity: DeepPartial<T> & { id: number },
    @Res() response?: Response
  ): Promise<R | Response<R> | undefined> {
    return this.repository
      .update(entity)
      .catch((error) => handleError(error, response!));
  }

  @Delete("/:id")
  async delete(
    @Param("id") id: number,
    @Res() response?: Response
  ): Promise<R | Response<R> | undefined> {
    return this.repository
      .delete(id)
      .catch((error) => handleError(error, response!));
  }
}
