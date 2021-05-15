import { Mapper, MapperFn } from "src/utils/mapper";
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectID,
  Repository,
} from "typeorm";

export class GenericRepository<T, R = T> {
  #repository: Repository<T>;
  #mapper: Mapper<T, R>;

  // prettier-ignore
  constructor(repository: Repository<T>, mapper?: Mapper<T, R> | MapperFn<T,R>) {
    this.#repository = repository;
    this.#mapper = mapper ? Mapper.from(mapper) : Mapper.IDENTITY;
  }

  async find(options?: FindManyOptions<T>): Promise<R[]> {
    const result = await this.#repository.find(options);
    return this.#mapper.mapMany(result);
  }

  async findById(
    id?: string | number | Date | ObjectID,
    options?: FindOneOptions<T>
  ): Promise<R | undefined> {
    const result = await this.#repository.findOne(id, options);
    if (result) {
      return this.#mapper.map(result);
    } else {
      return undefined;
    }
  }

  async create(entity: DeepPartial<T>): Promise<R> {
    const newEntity = this.#repository.create(entity);
    const result = await this.#repository.save(newEntity);
    return this.#mapper.map(result);
  }

  // prettier-ignore
  async update(entity: DeepPartial<T> & { id: number | string }): Promise<R | undefined> {
    const entityToUpdate = await this.#repository.findOne(entity.id);
    if (entityToUpdate) {
      const newEntity = this.#repository.create(entity);
      const result = await this.#repository.save(newEntity);
      return this.#mapper.map(result);
    } else {
      return undefined;
    }
  }

  async delete(id: number): Promise<R | undefined> {
    const entityToDelete = await this.#repository.findOne(id);
    if (entityToDelete) {
      const result = await this.#repository.remove(entityToDelete);
      return this.#mapper.map(result);
    } else {
      return undefined;
    }
  }
}
