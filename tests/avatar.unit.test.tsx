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
	});

	it("should render fallback icon when no name or src is provided", async () => {
		const html = (await Avatar({})) as any;
		const htmlString = html.toString();
		expect(htmlString).toContain("<svg");
		expect(htmlString).toContain("<title>User</title>");
	});

	it("should support compound API (dot-notation)", () => {
		expect(Avatar.Root).toBeDefined();
		expect(Avatar.Image).toBeDefined();
		expect(Avatar.Fallback).toBeDefined();

		const html = (
			<Avatar.Root>
				<Avatar.Image src="test.jpg" alt="Test Avatar" />
				<Avatar.Fallback>T</Avatar.Fallback>
			</Avatar.Root>
		).toString();

		expect(html).toContain("class=\"avatar__root");
		expect(html).toContain("class=\"avatar__image");
		expect(html).toContain("class=\"avatar__fallback");
		expect(html).toContain("test.jpg");
		expect(html).toContain("T");
	});
});
