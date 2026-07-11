import { describe, expect, it } from "bun:test";
import { Avatar } from "../app/components/ui/avatar";
import { getInitials } from "../app/components/ui/avatar-primitive";

describe("Avatar component", () => {
	it("should get initials correctly", () => {
		expect(getInitials("John Doe")).toBe("JD");
		expect(getInitials("Jane")).toBe("J");
		expect(getInitials("John Quincy Adams")).toBe("JA");
	});

	it("should render AvatarBase when no src is provided", async () => {
		const html = (await Avatar({ name: "John Doe" })) as any;
		// Hono JSX returns a string or an object with toString/toStringAsync
		const htmlString = html.toString();
		expect(htmlString).toContain("JD");
		expect(htmlString).toContain('data-scope="avatar"');
		expect(htmlString).toContain('data-part="root"');
		expect(htmlString).toContain('data-part="fallback"');
		expect(htmlString).toContain('data-state="visible"');
	});

	it("should render fallback icon when no name or src is provided", async () => {
		const html = (await Avatar({})) as any;
		const htmlString = html.toString();
		expect(htmlString).toContain("<svg");
		expect(htmlString).toContain("<title>User</title>");
	});

	it("should render image part and hide fallback when src and loaded status are provided", async () => {
		const html = (await Avatar({ src: "https://example.com/avatar.png", status: "loaded" })) as any;
		const htmlString = html.toString();
		expect(htmlString).toContain('data-part="image"');
		expect(htmlString).toContain('data-state="visible"');
		expect(htmlString).toContain('style="display:none"'); // fallback gets hidden
	});
});
