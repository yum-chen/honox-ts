import { describe, it, expect } from "bun:test";
import { validateField } from "../app/components/ui/field-primitive";

describe("Field Validation Logic", () => {
  it("should be valid if no rules are provided", () => {
    const result = validateField("test");
    expect(result.isInvalid).toBe(false);
  });

  it("should validate minLength", () => {
    const result = validateField("abc", 5);
    expect(result.isInvalid).toBe(true);
    expect(result.errorText).toBe("Must be at least 5 characters");
  });

  it("should pass minLength", () => {
    const result = validateField("abcdef", 5);
    expect(result.isInvalid).toBe(false);
  });

  it("should use custom validator (boolean)", () => {
    const validator = (val: string) => val === "secret";
    expect(validateField("wrong", undefined, validator).isInvalid).toBe(true);
    expect(validateField("secret", undefined, validator).isInvalid).toBe(false);
  });

  it("should use custom validator (string error)", () => {
    const validator = (val: string) => val.includes("@") ? true : "Missing @ symbol";
    const result = validateField("invalid", undefined, validator);
    expect(result.isInvalid).toBe(true);
    expect(result.errorText).toBe("Missing @ symbol");
  });
});
