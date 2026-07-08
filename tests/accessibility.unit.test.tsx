import { expect, test, describe } from "bun:test";
import { Dialog } from "../app/components/ui/dialog";
import { Drawer } from "../app/components/ui/drawer";

describe("Accessibility Unit Tests", () => {
	test("Dialog should support role prop", () => {
		const html = (
			<Dialog
				interactive
				role="alertdialog"
				trigger={<button type="button">Open</button>}
				title="Confirm"
			/>
		).toString();

		expect(html).toContain('role="alertdialog"');
	});

	test("Drawer should support role prop", () => {
		const html = (
			<Drawer
				interactive
				role="alertdialog"
				trigger={<button type="button">Open</button>}
				title="Confirm"
			/>
		).toString();

		expect(html).toContain('role="alertdialog"');
	});

    test("Dialog should default to role='dialog'", () => {
		const html = (
			<Dialog
				interactive
				trigger={<button type="button">Open</button>}
				title="Confirm"
			/>
		).toString();

		expect(html).toContain('role="dialog"');
	});
});
