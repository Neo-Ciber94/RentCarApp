import { Get, Post, Put, Delete, Param, Body } from "routing-controllers";
import { GenericRepository } from "src/repositories";
import { Mapper, MapperFn } from "src/utils";
import { DeepPartial, Repository } from "typeorm";

export interface ControllerOptions<T, R = T> {
  repository: Repository<T>;
  mapper?: Mapper<T, R> | MapperFn<T, R>;
  relations?: string[];
}

export class AbstractController<T, R = T> {
  protected readonly repository: GenericRepository<T, R>;
  protected readonly relations: string[];

  constructor(options: ControllerOptions<T, R>) {
    this.repository = new GenericRepository(options.repository, options.mapper);
    this.relations = options.relations || [];
  }

  @Get()
  getAll() {
    return this.repository.find({ relations: this.relations });
  }

  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.repository.findById(id, { relations: this.relations });
  }

  @Post()
  post(@Body() entity: DeepPartial<T>) {
    return this.repository.create(entity);
  }

  @Put()
  put(@Body() entity: DeepPartial<T> & { id: number }) {
    return this.repository.update(entity);
  }

  @Delete("/:id")
  delete(@Param("id") id: number) {
    return this.repository.delete(id);
  }
}
