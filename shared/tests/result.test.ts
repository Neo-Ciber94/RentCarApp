import { err, ok, Result } from "../result";
import assert from "assert";

describe("Result ok tests", () => {
  it("Result.isOk", () => {
    const result = ok(false);
    assert.ok(!result.isError);
    assert.ok(result.isOk);
  });

  it("Result.get()", () => {
    const result = ok(10);
    assert.strictEqual(result.get(), 10);
  });

  it("Result.getOr()", () => {
    const result = ok(10);
    assert.strictEqual(result.getOr(30), 10);
  });

  it("Result.getOrNull()", () => {
    const result = ok(10);
    assert.strictEqual(result.getOrNull(), 10);
  });

  it("Result.getOrUndefined()", () => {
    const result = ok(10);
    assert.strictEqual(result.getOrUndefined(), 10);
  });

  it("Result.getOrThrow()", () => {
    const result = ok(10);
    assert.strictEqual(result.getOrThrow(), 10);
  });

  it("Result.getOrError()", () => {
    const result = ok(10);
    assert.strictEqual(result.getOrError("Invalid value"), 10);
  });

  it("Result.contains", () => {
    const result = ok("Hello");
    assert.ok(result.contains("Hello"));
  });

  it("Result.map", () => {
    const result = ok(10);
    assert.strictEqual(result.map((n) => n + 2).get(), 12);
  });
});

describe("Result error tests", () => {
  it("Result.isError", () => {
    const result = err(true);
    assert.ok(!result.isOk);
    assert.ok(result.isError);
  });

  it("Result.get() throws", () => {
    const result = err(10);
    assert.throws(() => {
      result.get();
    });
  });

  it("Result.getError() throws", () => {
    const result = err(10);
    assert.strictEqual(result.getError(), 10);
  });

  it("Result.getOr()", () => {
    const result: Result<number, string> = err("Hello");
    assert.strictEqual(result.getOr(10), 10);
  });

  it("Result.getOrNull()", () => {
    const result: Result<number, string> = err("Hello");
    assert.strictEqual(result.getOrNull(), null);
  });

  it("Result.getOrUndefined()", () => {
    const result: Result<number, string> = err("Hello");
    assert.strictEqual(result.getOrUndefined(), undefined);
  });

  it("Result.getOrThrow()", () => {
    const result: Result<number, string> = err("Hello");
    assert.throws(() => {
      result.getOrThrow();
    });
  });

  it("Result.contains", () => {
    const result: Result<number, string> = err("Hello");
    assert.ok(!result.contains(20));
  });

  it("Result.containsError", () => {
    const result: Result<number, string> = err("Hello");
    assert.ok(result.containsError("Hello"));
  });

  it("Result.map", () => {
    const result: Result<number, string> = err("Invalid");
    assert.strictEqual(result.map((n) => n + 2).getError(), "Invalid");
  });
});
