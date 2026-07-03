import { describe, expect, test } from "bun:test";
import * as Tabs from "../app/components/ui/tabs";
import * as TabsPrimitive from "../app/components/ui/tabs-primitive";

describe("Tabs Unit Tests", () => {
	test("Tabs components are defined", () => {
		expect(Tabs.Root).toBeDefined();
		expect(Tabs.List).toBeDefined();
		expect(Tabs.Trigger).toBeDefined();
		expect(Tabs.Content).toBeDefined();
		expect(Tabs.Indicator).toBeDefined();
	});

	test("TabsPrimitive components are defined", () => {
		expect(TabsPrimitive.Root).toBeDefined();
		expect(TabsPrimitive.List).toBeDefined();
		expect(TabsPrimitive.Trigger).toBeDefined();
		expect(TabsPrimitive.Content).toBeDefined();
		expect(TabsPrimitive.Indicator).toBeDefined();
	});
});
