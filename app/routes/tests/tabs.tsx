import { createRoute } from "honox/factory";
import * as Tabs from "../../components/ui/tabs";

export default createRoute((c) => {
	return c.render(
		<div style={{ padding: "40px" }}>
			<Tabs.Root defaultValue="tab-1" id="tabs-test">
				<Tabs.List>
					<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
					<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
					<Tabs.Trigger value="tab-3" disabled>
						Tab 3
					</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>
				<Tabs.Content value="tab-1">Content 1</Tabs.Content>
				<Tabs.Content value="tab-2">Content 2</Tabs.Content>
				<Tabs.Content value="tab-3">Content 3</Tabs.Content>
			</Tabs.Root>

			<div style={{ marginTop: "40px" }}>
				<Tabs.Root defaultValue="tab-1" orientation="vertical" id="tabs-vertical-test">
					<Tabs.List>
						<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
						<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
						<Tabs.Indicator />
					</Tabs.List>
					<Tabs.Content value="tab-1">Content 1</Tabs.Content>
					<Tabs.Content value="tab-2">Content 2</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>,
		{ title: "Tabs Test" },
	);
});
