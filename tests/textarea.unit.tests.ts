import { describe, it, expect } from "bun:test";
import { Textarea } from "../app/components/ui/textarea";

describe("Textarea Unit Tests", () => {
	it("should render correctly", () => {
		const html = Textarea({ id: "test-id", label: "Test Label" }).toString();
		expect(html).toContain('id="test-id"');
		expect(html).toContain("Test Label");
		expect(html).toContain("<textarea");
	});

	it("should apply custom class", () => {
		const html = Textarea({ class: "custom-class" }).toString();
		expect(html).toContain("custom-class");
	});

	it("should apply variant classes", () => {
		const html = Textarea({ variant: "flushed" }).toString();
        expect(html).toContain("textarea");
	});

    it("should render as an island when interactive", () => {
        const html = Textarea({ interactive: true, id: "island-textarea" }).toString();
        expect(html).toContain("island-textarea");
    });
});
