import { Mapper, MapperFn } from "src/utils/mapper";
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from "typeorm";

type RepositoryOptions<T, R = T> = {
  repository: Repository<T>;
  mapper?: Mapper<T, R> | MapperFn<T, R>;
  relations?: string[];
};

export class GenericRepository<T, R = T> {
  protected readonly repository: Repository<T>;
  protected readonly mapper: Mapper<T, R>;
  protected readonly relations: string[];

  // prettier-ignore
  constructor(options: RepositoryOptions<T, R>) {
    this.repository = options.repository;
    this.relations = options.relations || [];
    this.mapper =  options.mapper ? Mapper.from(options.mapper) : Mapper.IDENTITY;
  }

  async find(options?: FindManyOptions<T>): Promise<R[]> {
    const result = await this.repository.find({
      relations: this.relations,
      ...options,
    });
    return this.mapper.mapMany(result);
  }

  async findById(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>
  ): Promise<R | undefined> {
    const result = await this.repository.findOne(id, {
      relations: this.relations,
      ...options,
    });
    if (result) {
      return this.mapper.map(result);
    } else {
      return undefined;
    }
  }

  async create(entity: DeepPartial<T>): Promise<R> {
    const newEntity = this.repository.create(entity);
    const result = await this.repository.save(newEntity);
    return this.mapper.map(result);
  }

  // prettier-ignore
  async update(entity: DeepPartial<T> & { id: number | string }): Promise<R | undefined> {
    const entityToUpdate = await this.repository.findOne(entity.id);
    if (entityToUpdate) {
      const newEntity = this.repository.create(entity);
      const result = await this.repository.save(newEntity);
      return this.mapper.map(result);
    } else {
      return undefined;
    }
  }

  async delete(id: number): Promise<R | undefined> {
    const entityToDelete = await this.repository.findOne(id);
    if (entityToDelete) {
      const result = await this.repository.remove(entityToDelete);
      return this.mapper.map(result);
    } else {
      return undefined;
    }
  }
}
