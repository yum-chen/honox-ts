import { css } from "styled-system/css";
import { Button, Heading, Menu, MenuPrimitive } from "../../components/ui";

const Container = ({ children, py }: any) => (
	<div
		class={css({
			maxW: "8xl",
			mx: "auto",
			px: { base: "4", md: "8" },
			py,
		})}
	>
		{children}
	</div>
);

const Stack = ({ children, gap, align }: any) => (
	<div
		class={css({
			display: "flex",
			flexDirection: "column",
			gap,
			alignItems: align,
		})}
	>
		{children}
	</div>
);

const _Box = ({
	children,
	p,
	bg,
	borderRadius,
	border,
	onContextMenu,
}: any) => (
	<button
		type="button"
		class={css({ p, bg, borderRadius, border, textAlign: "left" })}
		onContextMenu={onContextMenu}
	>
		{children}
	</button>
);

export default function MenuTestPage() {
	return (
		<Container py="12">
			<Stack gap="8">
				<Heading>Menu Test</Heading>

				<Stack gap="4" align="start">
					<Heading size="md">Simple Menu (Primitive API)</Heading>
					<MenuPrimitive.MenuRoot>
						<MenuPrimitive.MenuTrigger asChild>
							<Button variant="outline">Open Menu</Button>
						</MenuPrimitive.MenuTrigger>
						<MenuPrimitive.MenuPositioner>
							<MenuPrimitive.MenuContent>
								<MenuPrimitive.MenuItem value="edit">
									Edit
								</MenuPrimitive.MenuItem>
								<MenuPrimitive.MenuItem value="duplicate">
									Duplicate
								</MenuPrimitive.MenuItem>
								<MenuPrimitive.MenuItem value="delete">
									Delete
								</MenuPrimitive.MenuItem>
								<MenuPrimitive.MenuSeparator />
								<MenuPrimitive.MenuItem value="export">
									Export
								</MenuPrimitive.MenuItem>
							</MenuPrimitive.MenuContent>
						</MenuPrimitive.MenuPositioner>
					</MenuPrimitive.MenuRoot>
				</Stack>

				<Stack gap="4" align="start">
					<Heading size="md">Flattened Menu API (SSG Compatible)</Heading>

					<Stack gap="4" align="start">
						<Heading size="sm">Basic Menu</Heading>
						<Menu
							trigger={<Button variant="outline">Open Menu (Flattened)</Button>}
							interactive={false}
							items={[
								{ type: "item", label: "Edit", value: "edit" },
								{ type: "item", label: "Duplicate", value: "duplicate" },
								{ type: "separator" },
								{
									type: "item",
									label: "Delete",
									value: "delete",
									disabled: true,
								},
							]}
						/>
					</Stack>

					<Stack gap="4" align="start">
						<Heading size="sm">Menu with Checkbox Items</Heading>
						<Menu
							trigger={<Button variant="outline">View Options</Button>}
							interactive={false}
							items={[
								{
									type: "checkbox",
									label: "Show Sidebar",
									value: "sidebar",
									checked: true,
								},
								{
									type: "checkbox",
									label: "Show Toolbar",
									value: "toolbar",
									checked: false,
								},
								{ type: "separator" },
								{
									type: "checkbox",
									label: "Word Wrap",
									value: "wordwrap",
									checked: true,
								},
							]}
						/>
					</Stack>
				</Stack>
			</Stack>
		</Container>
	);
}
