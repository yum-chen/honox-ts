import {
	Alert,
	AlertIcon,
	Badge,
	Button,
	Card,
	Checkbox,
	Collapsible,
	Combobox,
	Dialog,
	Drawer,
	Heading,
	Stack,
	Text,
} from "./ui";

interface ComponentBlock {
	type: string;
	[key: string]: unknown;
}

interface PageRendererProps {
	content: ComponentBlock[];
}

function RenderBlock({ block }: { block: ComponentBlock }) {
	const { type, ...props } = block;

	switch (type) {
		case "stack": {
			const { children, ...stackProps } = props;
			return (
				<Stack {...stackProps}>
					<PageRenderer content={children as ComponentBlock[]} />
				</Stack>
			);
		}
		case "button": {
			const { text, ...buttonProps } = props;
			return <Button {...buttonProps}>{text as any}</Button>;
		}
		case "badge": {
			const { text, ...badgeProps } = props;
			return <Badge {...badgeProps}>{text as any}</Badge>;
		}
		case "alert": {
			const { title, description, status, variant, ...alertProps } = props;
			return (
				<Alert
					title={title as any}
					description={description as any}
					status={status as any}
					variant={variant as any}
					indicator={<AlertIcon />}
					{...alertProps}
				/>
			);
		}
		case "heading": {
			const { text, ...headingProps } = props;
			return <Heading {...headingProps}>{text as any}</Heading>;
		}
		case "text": {
			const { content, ...textProps } = props;
			return <Text {...textProps}>{content as any}</Text>;
		}
		case "checkbox": {
			const { label, checked, ...checkboxProps } = props;
			let resolvedChecked: boolean | "indeterminate" | undefined = undefined;
			if (checked === "true") {
				resolvedChecked = true;
			} else if (checked === "false") {
				resolvedChecked = false;
			} else if (checked === "indeterminate") {
				resolvedChecked = "indeterminate";
			} else if (typeof checked === "boolean") {
				resolvedChecked = checked;
			}
			return (
				<Checkbox checked={resolvedChecked} {...checkboxProps}>
					{label as any}
				</Checkbox>
			);
		}
		case "combobox": {
			const { items, label, ...comboboxProps } = props;
			return (
				<Combobox items={(items as any) || []} label={label as any} {...comboboxProps} />
			);
		}
		case "card": {
			const { title, description, body, footer, children, ...cardProps } = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;
			return (
				<Card
					title={title as any}
					description={description as any}
					body={body as any}
					footer={footer as any}
					{...cardProps}
				>
					{renderedChildren}
				</Card>
			);
		}
		case "collapsible": {
			const { trigger, content, children, ...collapsibleProps } = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;

			// Content of collapsible can be either the direct content string or nested children
			const collapsibleContent = (
				<div>
					{content && <p>{content as any}</p>}
					{renderedChildren}
				</div>
			);

			return (
				<Collapsible
					trigger={(trigger as any) || ""}
					content={collapsibleContent}
					{...collapsibleProps}
				/>
			);
		}
		case "dialog": {
			const { triggerText, title, description, body, cancelText, confirmText, children, ...dialogProps } = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;

			const dialogTrigger = triggerText ? (
				<Button variant="outline">{triggerText as any}</Button>
			) : undefined;

			const dialogBody = (
				<div>
					{body && <p>{body as any}</p>}
					{renderedChildren}
				</div>
			);

			const dialogCancel = cancelText ? (
				<Button variant="outline">{cancelText as any}</Button>
			) : undefined;

			const dialogConfirm = confirmText ? (
				<Button>{confirmText as any}</Button>
			) : undefined;

			return (
				<Dialog
					trigger={dialogTrigger}
					title={title as any}
					description={description as any}
					body={dialogBody}
					cancel={dialogCancel}
					confirm={dialogConfirm}
					{...dialogProps}
				/>
			);
		}
		case "drawer": {
			const { triggerText, title, description, body, cancelText, confirmText, children, ...drawerProps } = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;

			const drawerTrigger = triggerText ? (
				<Button variant="outline">{triggerText as any}</Button>
			) : undefined;

			const drawerBody = (
				<div>
					{body && <p>{body as any}</p>}
					{renderedChildren}
				</div>
			);

			const drawerCancel = cancelText ? (
				<Button variant="outline">{cancelText as any}</Button>
			) : undefined;

			const drawerConfirm = confirmText ? (
				<Button>{confirmText as any}</Button>
			) : undefined;

			return (
				<Drawer
					trigger={drawerTrigger}
					title={title as any}
					description={description as any}
					body={drawerBody}
					cancel={drawerCancel}
					confirm={drawerConfirm}
					{...drawerProps}
				/>
			);
		}
		default:
			return (
				<div>
					Unknown component type: {type}
					<pre>{JSON.stringify(props, null, 2)}</pre>
				</div>
			);
	}
}

function PageRenderer({ content }: PageRendererProps) {
	if (!content || !Array.isArray(content)) return null;

	return (
		<>
			{content.map((block, index) => (
				<RenderBlock key={`${block.type}-${index}`} block={block} />
			))}
		</>
	);
}

export { PageRenderer };
export type { PageRendererProps };
export type { ComponentBlock };
