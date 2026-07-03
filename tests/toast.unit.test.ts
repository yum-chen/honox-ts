import { expect, test, describe } from "bun:test";
import { toaster } from "../app/islands/toast";

describe("Toast Logic", () => {
    test("toaster utility should be defined", () => {
        expect(toaster).toBeDefined();
        expect(typeof toaster.create).toBe("function");
        expect(typeof toaster.success).toBe("function");
    });
});
import { Root, Title, Indicator } from "../app/components/ui/toast-primitive";

describe("Toast Components", () => {
    test("Root component exists", () => {
        expect(Root).toBeDefined();
    });
    test("Title component exists", () => {
        expect(Title).toBeDefined();
    });
    test("Indicator component exists", () => {
        expect(Indicator).toBeDefined();
    });
});
