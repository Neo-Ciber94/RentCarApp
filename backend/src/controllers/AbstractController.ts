import { Get, Post, Put, Delete, Param, Body } from "routing-controllers";
import { GenericRepository } from "src/repositories";
import { Mapper, MapperFn } from "src/utils";
import { DeepPartial, Repository } from "typeorm";

export class AbstractController<T, R> {
  protected readonly repository: GenericRepository<T, R>;

  constructor(
    repository: Repository<T>,
    mapper?: Mapper<T, R> | MapperFn<T, R>
  ) {
    this.repository = new GenericRepository(repository, mapper);
  }

  @Get()
  getAll() {
    return this.repository.find();
  }

  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.repository.findById(id);
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
