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
			const typedChildren = children as ComponentBlock[];
			return (
				<Stack {...stackProps}>
					<PageRenderer content={typedChildren} />
				</Stack>
			);
		}
		case "button": {
			const { text, ...buttonProps } = props;
			const typedText = text as string;
			return <Button {...buttonProps}>{typedText}</Button>;
		}
		case "badge": {
			const { text, ...badgeProps } = props;
			const typedText = text as string;
			return <Badge {...badgeProps}>{typedText}</Badge>;
		}
		case "alert": {
			const { title, description, status, variant, ...alertProps } = props;
			return (
				<Alert
					title={title as string}
					description={description as string}
					status={status as any}
					variant={variant as any}
					indicator={<AlertIcon />}
					{...alertProps}
				/>
			);
		}
		case "heading": {
			const { text, ...headingProps } = props;
			const typedText = text as string;
			return <Heading {...headingProps}>{typedText}</Heading>;
		}
		case "text": {
			const { content, ...textProps } = props;
			const typedContent = content as string;
			return <Text {...textProps}>{typedContent}</Text>;
		}
		case "card": {
			const {
				title,
				description,
				body,
				image,
				imagePosition,
				children,
				...cardProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<Card
					title={title as string}
					description={description as string}
					body={body as string}
					image={image as string}
					imagePosition={imagePosition as any}
					{...cardProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Card>
			);
		}
		case "checkbox": {
			const {
				label,
				checked,
				disabled,
				invalid,
				size,
				colorPalette,
				...checkboxProps
			} = props;
			return (
				<Checkbox
					interactive
					checked={checked as boolean}
					disabled={disabled as boolean}
					invalid={invalid as boolean}
					size={size as any}
					colorPalette={colorPalette as string}
					{...checkboxProps}
				>
					{label as string}
				</Checkbox>
			);
		}
		case "collapsible": {
			const {
				triggerText,
				trigger: triggerProp,
				showIndicator,
				indicatorPlacement,
				open,
				disabled,
				children,
				...collapsibleProps
			} = props;
			let trigger: any = triggerText as string;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (!trigger) {
				trigger = "Toggle";
			}
			const indicator = showIndicator ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class={css({
						transition: "transform 0.2s",
						"[data-state=open] &": { transform: "rotate(180deg)" },
					})}
				>
					<title>Chevron Down</title>
					<path d="m6 9 6 6 6-6" />
				</svg>
			) : undefined;

			const typedChildren = children as ComponentBlock[];

			return (
				<Collapsible
					interactive
					trigger={trigger}
					indicator={indicator}
					indicatorPlacement={indicatorPlacement as any}
					defaultOpen={open as boolean}
					disabled={disabled as boolean}
					content={<div>{typedChildren && <PageRenderer content={typedChildren} />}</div>}
					{...collapsibleProps}
				/>
			);
		}
		case "combobox": {
			const { label, placeholder, items, ...comboboxProps } = props;
			return (
				<Combobox
					interactive
					label={label as string}
					placeholder={placeholder as string}
					items={(items as any[]) || []}
					{...comboboxProps}
				/>
			);
		}
		case "dialog": {
			const {
				title,
				description,
				triggerText,
				trigger: triggerProp,
				confirmText,
				cancelText,
				role,
				children,
				...dialogProps
			} = props;
			let trigger: any = undefined;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (triggerText) {
				trigger = <Button variant="outline">{triggerText as string}</Button>;
			}
			const confirm = confirmText ? <Button>{confirmText as string}</Button> : undefined;
			const cancel = cancelText ? (
				<Button variant="outline">{cancelText as string}</Button>
			) : undefined;

			const typedChildren = children as ComponentBlock[];

			return (
				<Dialog
					interactive
					title={title as string}
					description={description as string}
					trigger={trigger}
					confirm={confirm}
					cancel={cancel}
					role={role as any}
					{...dialogProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Dialog>
			);
		}
		case "drawer": {
			const {
				title,
				description,
				triggerText,
				trigger: triggerProp,
				confirmText,
				cancelText,
				children,
				...drawerProps
			} = props;
			let trigger: any = undefined;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (triggerText) {
				trigger = <Button variant="outline">{triggerText as string}</Button>;
			}
			const confirm = confirmText ? <Button>{confirmText as string}</Button> : undefined;
			const cancel = cancelText ? (
				<Button variant="outline">{cancelText as string}</Button>
			) : undefined;

			const typedChildren = children as ComponentBlock[];

			return (
				<Drawer
					interactive
					title={title as string}
					description={description as string}
					trigger={trigger}
					confirm={confirm}
					cancel={cancel}
					{...drawerProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Drawer>
			);
		}
		case "field": {
			const {
				label,
				helperText,
				errorText,
				disabled,
				invalid,
				readOnly,
				required,
				defaultValue,
				children,
				...fieldProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<Field
					interactive
					label={label as any}
					helperText={helperText as any}
					errorText={errorText as any}
					disabled={disabled as boolean}
					invalid={invalid as boolean}
					readOnly={readOnly as boolean}
					required={required as boolean}
					defaultValue={defaultValue as string}
					{...fieldProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Field>
			);
		}
		case "fieldset": {
			const {
				legend,
				helperText,
				errorText,
				disabled,
				invalid,
				children,
				...fieldsetProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<Fieldset
					legend={legend as any}
					helperText={helperText as any}
					errorText={errorText as any}
					disabled={disabled as boolean}
					invalid={invalid as boolean}
					{...fieldsetProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Fieldset>
			);
		}
		case "group": {
			const {
				orientation,
				attached,
				grow,
				children,
				...groupProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<Group
					orientation={orientation as any}
					attached={attached as boolean}
					grow={grow as boolean}
					{...groupProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Group>
			);
		}
		case "hovercard":
		case "hover-card": {
			const {
				triggerText,
				trigger: triggerProp,
				title,
				description,
				showArrow,
				interactive = true,
				children,
				...hoverCardProps
			} = props;
			let trigger: any = undefined;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (triggerText) {
				trigger = <Button variant="plain">{triggerText as string}</Button>;
			}
			const typedChildren = children as ComponentBlock[];
			return (
				<HoverCard
					interactive={interactive as boolean}
					trigger={trigger}
					title={title as any}
					description={description as any}
					showArrow={showArrow as boolean}
					content={typedChildren ? <PageRenderer content={typedChildren} /> : undefined}
					{...hoverCardProps}
				/>
			);
		}
		case "menu": {
			const {
				triggerText,
				trigger: triggerProp,
				items,
				children,
				...menuProps
			} = props;
			let trigger: any = undefined;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (triggerText) {
				trigger = <Button variant="outline">{triggerText as string}</Button>;
			}
			const typedChildren = children as ComponentBlock[];
			return (
				<Menu
					interactive
					trigger={trigger}
					items={items as any[]}
					{...menuProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Menu>
			);
		}
		case "paginatedtable":
		case "paginatedTable": {
			return <PaginatedTable {...props} />;
		}
		case "pagination": {
			const {
				count,
				pageSize,
				defaultPage,
				siblingCount,
				boundaryCount,
				interactive,
				...paginationProps
			} = props;
			return (
				<Pagination
					count={count as number}
					pageSize={pageSize as number}
					defaultPage={defaultPage as number}
					siblingCount={siblingCount as number}
					boundaryCount={boundaryCount as number}
					interactive={interactive as boolean}
					{...paginationProps}
				/>
			);
		}
		case "popover": {
			const {
				triggerText,
				trigger: triggerProp,
				title,
				description,
				body,
				footer,
				showArrow,
				closable,
				interactive,
				children,
				...popoverProps
			} = props;
			let trigger: any = undefined;
			if (triggerProp && Array.isArray(triggerProp) && triggerProp.length > 0) {
				trigger = <PageRenderer content={triggerProp as ComponentBlock[]} />;
			} else if (triggerText) {
				trigger = <Button variant="outline">{triggerText as string}</Button>;
			}
			const typedChildren = children as ComponentBlock[];
			return (
				<Popover
					trigger={trigger}
					title={title as any}
					description={description as any}
					body={body as any}
					footer={footer as any}
					showArrow={showArrow as boolean}
					closable={closable as boolean}
					interactive={interactive as boolean}
					{...popoverProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Popover>
			);
		}
		case "progress": {
			const {
				label,
				value,
				min,
				max,
				type: progressType,
				showValueText,
				...progressProps
			} = props;
			return (
				<Progress
					label={label as any}
					value={value as number}
					min={min as number}
					max={max as number}
					type={progressType as any}
					showValueText={showValueText as boolean}
					{...progressProps}
				/>
			);
		}
		case "radiogroup":
		case "radioGroup": {
			const {
				label,
				items,
				defaultValue,
				value,
				interactive,
				children,
				...radioGroupProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<RadioGroup
					label={label as any}
					items={items as any[]}
					defaultValue={defaultValue as string}
					value={value as string}
					interactive={interactive as boolean}
					{...radioGroupProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</RadioGroup>
			);
		}
		case "segmentgroup":
		case "segmentGroup": {
			const {
				label,
				items,
				defaultValue,
				value,
				interactive,
				children,
				...segmentGroupProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			return (
				<SegmentGroup
					label={label as any}
					items={items as any[]}
					defaultValue={defaultValue as any}
					value={value as any}
					interactive={interactive as boolean}
					{...segmentGroupProps}
				>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</SegmentGroup>
			);
		}
		case "slider": {
			const {
				label,
				min,
				max,
				step,
				defaultValue,
				showValueText,
				orientation,
				interactive,
				...sliderProps
			} = props;
			return (
				<Slider
					label={label as any}
					min={min as number}
					max={max as number}
					step={step as number}
					defaultValue={defaultValue as any}
					showValueText={showValueText as boolean}
					orientation={orientation as any}
					interactive={interactive as boolean}
					{...sliderProps}
				/>
			);
		}
		case "switch": {
			const {
				label,
				defaultChecked,
				checked,
				disabled,
				interactive,
				...switchProps
			} = props;
			return (
				<Switch
					label={label as any}
					defaultChecked={defaultChecked as boolean}
					checked={checked as boolean}
					disabled={disabled as boolean}
					interactive={interactive as boolean}
					{...switchProps}
				/>
			);
		}
		case "skeleton": {
			const {
				circle,
				noOfLines,
				children,
				...skeletonProps
			} = props;
			const typedChildren = children as ComponentBlock[];
			if (circle) {
				return <SkeletonCircle {...skeletonProps} />;
			}
			if (noOfLines !== undefined && noOfLines !== null) {
				return <SkeletonText noOfLines={noOfLines as number} {...skeletonProps} />;
			}
			return (
				<Skeleton {...skeletonProps}>
					{typedChildren && <PageRenderer content={typedChildren} />}
				</Skeleton>
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

export function PageRenderer({ content }: PageRendererProps) {
	if (!content || !Array.isArray(content)) return null;

	return (
		<>
			{content.map((block, index) => (
				<RenderBlock key={`${block.type}-${index}`} block={block} />
			))}
		</>
	);
}
