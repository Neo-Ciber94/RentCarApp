/**
 * A mapper function.
 */
export type MapperFn<T, R> = (value: T) => R;

/**
 * An entity mapper.
 */
export abstract class Mapper<T, R> {
  /**
   * A mapper that returns the input value.
   */
  static readonly IDENTITY: Mapper<any, any> = Mapper.from(identity);

  /**
   * Maps the given entity to other type.
   */
  abstract map(entity: T): R;

  /**
   * Maps any an entity or array of entity of type `T`.
   */
  mapAny(entity: T | T[]): R | R[] {
    if (Array.isArray(entity)) {
      return this.mapMany(entity);
    } else {
      return this.map(entity);
    }
  }

  /**
   * Maps an array of entities.
   */
  mapMany(entities: T[]): R[] {
    const result: R[] = [];
    for (const e of entities) {
      result.push(this.map(e));
    }
    return result;
  }

  static from<T, R>(mapper: Mapper<T, R> | MapperFn<T, R>): Mapper<T, R> {
    if (typeof mapper === "function") {
      return new (class extends Mapper<T, R> {
        map(entity: T): R {
          return mapper(entity);
        }
      })();
    } else {
      return new (class extends Mapper<T, R> {
        map(entity: T): R {
          return mapper.map(entity);
        }
      })();
    }
  }
}

export function identity<T>(value: T): T {
  return value;
}
