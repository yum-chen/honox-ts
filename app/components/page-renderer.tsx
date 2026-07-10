import { css } from "styled-system/css";
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
	Field,
	Fieldset,
	Group,
	Heading,
	HoverCard,
	Menu,
	type MenuItem,
	PaginatedTable,
	Pagination,
	Popover,
	Progress,
	RadioGroup,
	SegmentGroup,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Slider,
	Stack,
	Switch,
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
			return <Button {...buttonProps}>{text as string}</Button>;
		}
		case "badge": {
			const { text, ...badgeProps } = props;
			return <Badge {...badgeProps}>{text as string}</Badge>;
		}
		case "alert": {
			const { title, description, status, variant, ...alertProps } = props;
			return (
				<Alert
					title={title as string}
					description={description as string}
					status={status as "info" | "success" | "warning" | "error"}
					variant={variant as "subtle" | "solid" | "outline" | "surface"}
					indicator={<AlertIcon />}
					{...alertProps}
				/>
			);
		}
		case "heading": {
			const { text, ...headingProps } = props;
			return <Heading {...headingProps}>{text as string}</Heading>;
		}
		case "text": {
			const { content, ...textProps } = props;
			return <Text {...textProps}>{content as string}</Text>;
		}
		case "checkbox": {
			const { label, checked, ...checkboxProps } = props;
			let resolvedChecked: boolean | "indeterminate" | undefined;
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
					{label as string}
				</Checkbox>
			);
		}
		case "combobox": {
			const { items, label, ...comboboxProps } = props;
			return (
				<Combobox
					items={
						(items as { label: string; value: string; disabled?: boolean }[]) ||
						[]
					}
					label={label as string}
					{...comboboxProps}
				/>
			);
		}
		case "card": {
			const { title, description, body, footer, children, ...cardProps } =
				props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;
			return (
				<Card
					title={title as string}
					description={description as string}
					body={body as string}
					footer={footer as string}
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
					{content && <p>{content as string}</p>}
					{renderedChildren}
				</div>
			);

			return (
				<Collapsible
					trigger={(trigger as string) || ""}
					content={collapsibleContent}
					{...collapsibleProps}
				/>
			);
		}
		case "dialog": {
			const {
				triggerText,
				title,
				description,
				body,
				cancelText,
				confirmText,
				children,
				...dialogProps
			} = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;

			const dialogTrigger = triggerText ? (
				<Button variant="outline">{triggerText as string}</Button>
			) : undefined;

			const dialogBody = (
				<div>
					{body && <p>{body as string}</p>}
					{renderedChildren}
				</div>
			);

			const dialogCancel = cancelText ? (
				<Button variant="outline">{cancelText as string}</Button>
			) : undefined;

			const dialogConfirm = confirmText ? (
				<Button>{confirmText as string}</Button>
			) : undefined;

			return (
				<Dialog
					trigger={dialogTrigger}
					title={title as string}
					description={description as string}
					body={dialogBody}
					cancel={dialogCancel}
					confirm={dialogConfirm}
					{...dialogProps}
				/>
			);
		}
		case "drawer": {
			const {
				triggerText,
				title,
				description,
				body,
				cancelText,
				confirmText,
				children,
				...drawerProps
			} = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;

			const drawerTrigger = triggerText ? (
				<Button variant="outline">{triggerText as string}</Button>
			) : undefined;

			const drawerBody = (
				<div>
					{body && <p>{body as string}</p>}
					{renderedChildren}
				</div>
			);

			const drawerCancel = cancelText ? (
				<Button variant="outline">{cancelText as string}</Button>
			) : undefined;

			const drawerConfirm = confirmText ? (
				<Button>{confirmText as string}</Button>
			) : undefined;

			return (
				<Drawer
					trigger={drawerTrigger}
					title={title as string}
					description={description as string}
					body={drawerBody}
					cancel={drawerCancel}
					confirm={drawerConfirm}
					{...drawerProps}
				/>
			);
		}
		case "field": {
			const { label, helperText, errorText, placeholder, ...fieldProps } =
				props;
			return (
				<Field
					label={label as string}
					helperText={helperText as string}
					errorText={errorText as string}
					placeholder={placeholder as string}
					{...fieldProps}
				/>
			);
		}
		case "fieldset": {
			const { legend, helperText, errorText, children, ...fieldsetProps } =
				props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;
			return (
				<Fieldset
					legend={legend as string}
					helperText={helperText as string}
					errorText={errorText as string}
					{...fieldsetProps}
				>
					{renderedChildren}
				</Fieldset>
			);
		}
		case "group": {
			const { children, ...groupProps } = props;
			const renderedChildren = children ? (
				<PageRenderer content={children as ComponentBlock[]} />
			) : undefined;
			return <Group {...groupProps}>{renderedChildren}</Group>;
		}
		case "hoverCard": {
			const { triggerText, title, description, ...hoverCardProps } = props;
			const hoverTrigger = triggerText ? (
				<Text
					class={css({
						cursor: "pointer",
						textDecoration: "underline",
						textDecorationStyle: "dotted",
					})}
				>
					{triggerText as string}
				</Text>
			) : undefined;
			return (
				<HoverCard
					trigger={hoverTrigger}
					title={title as string}
					description={description as string}
					{...hoverCardProps}
				/>
			);
		}
		case "menu": {
			const { triggerText, items, ...menuProps } = props;
			const menuTrigger = triggerText ? (
				<Button variant="outline">{triggerText as string}</Button>
			) : undefined;
			return (
				<Menu
					trigger={menuTrigger}
					items={items as MenuItem[]}
					{...menuProps}
				/>
			);
		}
		case "paginatedTable": {
			return <PaginatedTable {...props} />;
		}
		case "pagination": {
			const { count, ...paginationProps } = props;
			return <Pagination count={count as number} {...paginationProps} />;
		}
		case "popover": {
			const {
				triggerText,
				title,
				description,
				body,
				cancelText,
				...popoverProps
			} = props;
			const popoverTrigger = triggerText ? (
				<Button variant="outline">{triggerText as string}</Button>
			) : undefined;
			const popoverCancel = cancelText ? (
				<Button variant="outline">{cancelText as string}</Button>
			) : undefined;
			return (
				<Popover
					trigger={popoverTrigger}
					title={title as string}
					description={description as string}
					body={body as string}
					footer={popoverCancel}
					{...popoverProps}
				/>
			);
		}
		case "progress": {
			const { label, value, ...progressProps } = props;
			return (
				<Progress
					label={label as string}
					value={value === null ? null : (value as number)}
					{...progressProps}
				/>
			);
		}
		case "radioGroup": {
			const { label, items, ...radioGroupProps } = props;
			return (
				<RadioGroup
					label={label as string}
					items={
						items as (
							| string
							| { value: string; label: string; disabled?: boolean }
						)[]
					}
					{...radioGroupProps}
				/>
			);
		}
		case "segmentGroup": {
			const { label, items, ...segmentGroupProps } = props;
			return (
				<SegmentGroup
					label={label as string}
					items={
						items as (
							| string
							| { value: string; label: string; disabled?: boolean }
						)[]
					}
					{...segmentGroupProps}
				/>
			);
		}
		case "slider": {
			const { label, defaultValue, ...sliderProps } = props;
			return (
				<Slider
					label={label as string}
					defaultValue={defaultValue as number}
					{...sliderProps}
				/>
			);
		}
		case "switch": {
			const { label, ...switchProps } = props;
			return <Switch {...switchProps}>{label as string}</Switch>;
		}
		case "skeleton": {
			const { skeletonType, noOfLines, gap, ...skeletonProps } = props;
			if (skeletonType === "circle") {
				return <SkeletonCircle {...skeletonProps} />;
			}
			if (skeletonType === "text") {
				return (
					<SkeletonText
						noOfLines={noOfLines as number}
						gap={gap as string}
						{...skeletonProps}
					/>
				);
			}
			return <Skeleton {...skeletonProps} />;
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

export type { ComponentBlock, PageRendererProps };
export { PageRenderer };
