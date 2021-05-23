import isPromise from "is-promise";

/**
 * Wraps a value that can be either a valid value `Ok(T)` or an error value `Err(E)`.
 */
export abstract class Result<T, E> {
  protected abstract readonly value: T | E;

  /**
   * Type of the result: `ok` or `error`
   */
  abstract readonly status: "ok" | "error";

  /**
   * Returns `true` is the result is ok.
   */
  abstract get isOk(): boolean;

  /**
   * Construct a `Result<T,E>` from other.
   */
  static from<T, E>(result: Result<T, E>): Result<T, E>;
  static from<T, E>(result: Promise<Result<T, E>>): Promise<Result<T, E>>;
  static from<T, E>(
    result: Result<T, E> | Promise<Result<T, E>>
  ): Result<T, E> | Promise<Result<T, E>> {
    if (isPromise(result)) {
      return result.then((e) => Result.from(e));
    } else {
      switch (result.status) {
        case "ok":
          return new Ok(result.value as T);
        case "error":
          return new Err(result.value as E);
      }
    }
  }

  /**
   * Returns `true` is the result is an error.
   */
  get isError(): boolean {
    return !this.isOk;
  }

  /**
   * Gets the value of this return if is ok.
   */
  abstract get(): T;

  /**
   * Gets the error of this result is is an error.
   */
  abstract getError(): E;

  /**
   * Gets the value if is ok, otherwise returns `null`.
   */
  getOrNull(): T | null {
    return this.isOk ? this.get() : null;
  }

  /**
   * Gets the value if is ok, otherwise returns `undefined`.
   */
  getOrUndefined(): T | undefined {
    return this.isOk ? this.get() : undefined;
  }

  /**
   * Gets the value if is ok, otherwise throws an error.
   */
  getOrThrow(): T {
    if (this.isOk) {
      return this.get();
    } else {
      throwIsError(this.getError());
    }
  }

  /**
   * Gets the value if is ok, otherwise throws the specify error.
   */
  getOrError(error: string): T {
    if (this.isOk) {
      return this.get();
    } else {
      throw new Error(error);
    }
  }

  /**
   * Get the value if is ok, otherwise return the specify value.
   */
  getOr(value: T | (() => T)): T {
    if (this.isOk) {
      return this.get();
    }

    if (typeof value === "function") {
      return (value as () => T)();
    } else {
      return value;
    }
  }

  /**
   * Returns `true` if the result contains the given value.
   */
  contains(value: T): boolean {
    if (this.isOk) {
      return this.get() === value;
    } else {
      return false;
    }
  }

  /**
   * Returns `true` if the result contains the given error.
   */
  containsError(error: E): boolean {
    if (this.isError) {
      return this.getError() === error;
    } else {
      return false;
    }
  }

  /**
   * Maps the value of this result if is `Ok` otherwise returns an error result.
   */
  map<R>(fn: (value: T) => R): Result<R, E> {
    if (this.isOk) {
      return ok(fn(this.get()));
    } else {
      return err(this.getError());
    }
  }

  /**
   * Returns this result as an `Ok`.
   */
  asOk(): Ok<T> {
    if (this.isOk && this instanceof Ok) {
      return this;
    } else {
      throwIsError(this.getError());
    }
  }

  /**
   * Returns this result as an `Err`.
   */
  asError(): Err<E> {
    if (this.isError && this instanceof Err) {
      return this;
    } else {
      throwIsOk(this.get());
    }
  }
}

/**
 * An ok result.
 */
class Ok<T> extends Result<T, never> {
  readonly status = "ok";

  constructor(protected readonly value: T) {
    super();
  }

  get isOk(): boolean {
    return true;
  }

  get(): T {
    return this.value;
  }

  getError(): never {
    throwIsOk(this.value);
  }
}

/**
 * An error result.
 */
class Err<E> extends Result<never, E> {
  readonly status = "error";

  constructor(protected readonly value: E) {
    super();
  }

  get isOk(): boolean {
    return false;
  }

  get(): never {
    throwIsError(this.value);
  }

  getError(): E {
    return this.value;
  }
}

/**
 * Creates an `Ok` result.
 */
export function ok<T, E = never>(value: T): Result<T, E> {
  return new Ok<T>(value);
}

/**
 * Creates an `Error` result.
 */
export function err<E, T = never>(error: E): Result<T, E> {
  return new Err<E>(error);
}

function throwIsOk(value: any): never {
  throw new Error(`Result is ok: ${value}`);
}

function throwIsError(error: any): never {
  throw new Error(`Result is an error: ${error}`);
}
