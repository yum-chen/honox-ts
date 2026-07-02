import { describe, it, expect } from "vitest";

// Draft unit tests for the validation logic used by the Field component.
// This logic is mirrored from app/components/ui/field-primitive.tsx.

describe("Field Validation Logic", () => {
  const validate = (value: string | undefined, minLength?: number, validator?: (val: string) => boolean | string) => {
    let isInvalid = false;
    let errorText: string | undefined;

    if (validator && value !== undefined) {
      const result = validator(value);
      if (result === false) {
        isInvalid = true;
      } else if (typeof result === "string") {
        isInvalid = true;
        errorText = result;
      }
    } else if (minLength !== undefined && value !== undefined && value !== "") {
      if (value.length < minLength) {
        isInvalid = true;
        errorText = `Must be at least ${minLength} characters`;
      }
    }
    return { isInvalid, errorText };
  };

  it("should be valid if no rules are provided", () => {
    const result = validate("test");
    expect(result.isInvalid).toBe(false);
  });

  it("should validate minLength", () => {
    const result = validate("abc", 5);
    expect(result.isInvalid).toBe(true);
    expect(result.errorText).toBe("Must be at least 5 characters");
  });

  it("should pass minLength", () => {
    const result = validate("abcdef", 5);
    expect(result.isInvalid).toBe(false);
  });

  it("should use custom validator (boolean)", () => {
    const validator = (val: string) => val === "secret";
    expect(validate("wrong", undefined, validator).isInvalid).toBe(true);
    expect(validate("secret", undefined, validator).isInvalid).toBe(false);
  });

  it("should use custom validator (string error)", () => {
    const validator = (val: string) => val.includes("@") ? true : "Missing @ symbol";
    const result = validate("invalid", undefined, validator);
    expect(result.isInvalid).toBe(true);
    expect(result.errorText).toBe("Missing @ symbol");
  });
});
