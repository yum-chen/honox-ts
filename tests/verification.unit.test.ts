import { describe, it, expect } from "bun:test";
import { segmentGroup } from "../styled-system/recipes";
import { toggleGroup } from "../styled-system/recipes";
import { tabs } from "../styled-system/recipes";

describe("Recipe Slots Verification", () => {
  it("segmentGroup should have correct slots", () => {
    const styles = segmentGroup({});
    expect(styles.root).toBeDefined();
    expect(styles.label).toBeDefined();
    expect(styles.indicator).toBeDefined();
    expect(styles.item).toBeDefined();
    expect(styles.itemText).toBeDefined();
    expect(styles.itemControl).toBeDefined();
    expect(styles.itemHiddenInput).toBeDefined();
  });

  it("toggleGroup should have correct slots", () => {
    const styles = toggleGroup({});
    expect(styles.root).toBeDefined();
    expect(styles.item).toBeDefined();
  });

  it("tabs should have correct slots", () => {
    const styles = tabs({});
    expect(styles.root).toBeDefined();
    expect(styles.list).toBeDefined();
    expect(styles.trigger).toBeDefined();
    expect(styles.content).toBeDefined();
    expect(styles.indicator).toBeDefined();
  });
});
