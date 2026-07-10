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
	[key: string]: any;
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
					<PageRenderer content={children} />
				</Stack>
			);
		}
		case "button": {
			const { text, ...buttonProps } = props;
			return <Button {...buttonProps}>{text}</Button>;
		}
		case "badge": {
			const { text, ...badgeProps } = props;
			return <Badge {...badgeProps}>{text}</Badge>;
		}
		case "alert": {
			const { title, description, status, variant, ...alertProps } = props;
			return (
				<Alert
					title={title}
					description={description}
					status={status}
					variant={variant}
					indicator={<AlertIcon />}
					{...alertProps}
				/>
			);
		}
		case "heading": {
			const { text, ...headingProps } = props;
			return <Heading {...headingProps}>{text}</Heading>;
		}
		case "text": {
			const { content, ...textProps } = props;
			return <Text {...textProps}>{content}</Text>;
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
			return (
				<Card
					title={title}
					description={description}
					body={body}
					image={image}
					imagePosition={imagePosition}
					{...cardProps}
				>
					{children && <PageRenderer content={children} />}
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
					checked={checked}
					disabled={disabled}
					invalid={invalid}
					size={size}
					colorPalette={colorPalette}
					{...checkboxProps}
				>
					{label}
				</Checkbox>
			);
		}
		case "collapsible": {
			const {
				triggerText,
				showIndicator,
				indicatorPlacement,
				open,
				disabled,
				children,
				...collapsibleProps
			} = props;
			const trigger = triggerText || "Toggle";
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

			return (
				<Collapsible
					interactive
					trigger={trigger}
					indicator={indicator}
					indicatorPlacement={indicatorPlacement}
					defaultOpen={open}
					disabled={disabled}
					content={<div>{children && <PageRenderer content={children} />}</div>}
					{...collapsibleProps}
				/>
			);
		}
		case "combobox": {
			const { label, placeholder, items, ...comboboxProps } = props;
			return (
				<Combobox
					interactive
					label={label}
					placeholder={placeholder}
					items={items || []}
					{...comboboxProps}
				/>
			);
		}
		case "dialog": {
			const {
				title,
				description,
				triggerText,
				confirmText,
				cancelText,
				role,
				children,
				...dialogProps
			} = props;
			const trigger = triggerText ? (
				<Button variant="outline">{triggerText}</Button>
			) : undefined;
			const confirm = confirmText ? <Button>{confirmText}</Button> : undefined;
			const cancel = cancelText ? (
				<Button variant="outline">{cancelText}</Button>
			) : undefined;

			return (
				<Dialog
					interactive
					title={title}
					description={description}
					trigger={trigger}
					confirm={confirm}
					cancel={cancel}
					role={role}
					{...dialogProps}
				>
					{children && <PageRenderer content={children} />}
				</Dialog>
			);
		}
		case "drawer": {
			const {
				title,
				description,
				triggerText,
				confirmText,
				cancelText,
				children,
				...drawerProps
			} = props;
			const trigger = triggerText ? (
				<Button variant="outline">{triggerText}</Button>
			) : undefined;
			const confirm = confirmText ? <Button>{confirmText}</Button> : undefined;
			const cancel = cancelText ? (
				<Button variant="outline">{cancelText}</Button>
			) : undefined;

			return (
				<Drawer
					interactive
					title={title}
					description={description}
					trigger={trigger}
					confirm={confirm}
					cancel={cancel}
					{...drawerProps}
				>
					{children && <PageRenderer content={children} />}
				</Drawer>
			);
		}
		case "field": {
			const {
				label,
				helperText,
				errorText,
				defaultValue,
				disabled,
				invalid,
				required,
				readOnly,
				children,
				...fieldProps
			} = props;
			return (
				<Field
					interactive
					label={label}
					helperText={helperText}
					errorText={errorText}
					defaultValue={defaultValue}
					disabled={disabled}
					invalid={invalid}
					required={required}
					readOnly={readOnly}
					{...fieldProps}
				>
					{children && <PageRenderer content={children} />}
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
			return (
				<Fieldset
					legend={legend}
					helperText={helperText}
					errorText={errorText}
					disabled={disabled}
					invalid={invalid}
					{...fieldsetProps}
				>
					{children && <PageRenderer content={children} />}
				</Fieldset>
			);
		}
		case "group": {
			const { attached, grow, orientation, children, ...groupProps } = props;
			return (
				<Group
					attached={attached}
					grow={grow}
					orientation={orientation}
					{...groupProps}
				>
					{children && <PageRenderer content={children} />}
				</Group>
			);
		}
		case "hover-card":
		case "hoverCard": {
			const {
				triggerText,
				showArrow,
				title,
				description,
				children,
				...hoverCardProps
			} = props;
			const trigger = triggerText ? (
				<Button variant="outline">{triggerText}</Button>
			) : undefined;
			const content =
				children || title || description ? (
					<>
						{title && <Text fontWeight="bold">{title}</Text>}
						{description && (
							<Text size="sm" class={css({ color: "fg.muted", mt: "1" })}>
								{description}
							</Text>
						)}
						{children && <PageRenderer content={children} />}
					</>
				) : undefined;
			return (
				<HoverCard
					interactive
					trigger={trigger}
					showArrow={showArrow}
					content={content}
					{...hoverCardProps}
				/>
			);
		}
		case "menu": {
			const { triggerText, items, ...menuProps } = props;
			const trigger = triggerText ? (
				<Button variant="outline">{triggerText}</Button>
			) : undefined;
			return (
				<Menu
					interactive
					trigger={trigger}
					items={items || []}
					{...menuProps}
				/>
			);
		}
		case "paginated-table":
		case "paginatedTable": {
			return <PaginatedTable {...props} />;
		}
		case "pagination": {
			const { count = 100, pageSize = 10, ...paginationProps } = props;
			return (
				<Pagination
					interactive
					count={Number(count)}
					pageSize={Number(pageSize)}
					{...paginationProps}
				/>
			);
		}
		case "popover": {
			const {
				triggerText,
				title,
				description,
				body,
				footer,
				showArrow,
				closable,
				children,
				...popoverProps
			} = props;
			const trigger = triggerText ? (
				<Button variant="outline">{triggerText}</Button>
			) : undefined;
			return (
				<Popover
					interactive
					trigger={trigger}
					title={title}
					description={description}
					body={body}
					footer={footer}
					showArrow={showArrow}
					closable={closable}
					{...popoverProps}
				>
					{children && <PageRenderer content={children} />}
				</Popover>
			);
		}
		case "progress": {
			const { label, showValueText, value, min, max, type, ...progressProps } =
				props;
			return (
				<Progress
					label={label}
					showValueText={showValueText}
					value={value !== undefined ? Number(value) : undefined}
					min={min !== undefined ? Number(min) : undefined}
					max={max !== undefined ? Number(max) : undefined}
					type={type}
					{...progressProps}
				/>
			);
		}
		case "radio-group":
		case "radioGroup": {
			const { label, items, ...radioProps } = props;
			return (
				<RadioGroup
					interactive
					label={label}
					items={items || []}
					{...radioProps}
				/>
			);
		}
		case "segment-group":
		case "segmentGroup": {
			const { label, items, ...segmentProps } = props;
			return (
				<SegmentGroup
					interactive
					label={label}
					items={items || []}
					{...segmentProps}
				/>
			);
		}
		case "slider": {
			const {
				label,
				showValueText,
				min,
				max,
				step,
				defaultValue,
				value,
				...sliderProps
			} = props;
			return (
				<Slider
					interactive
					label={label}
					showValueText={showValueText}
					min={min !== undefined ? Number(min) : undefined}
					max={max !== undefined ? Number(max) : undefined}
					step={step !== undefined ? Number(step) : undefined}
					defaultValue={
						defaultValue !== undefined
							? Array.isArray(defaultValue)
								? defaultValue.map(Number)
								: Number(defaultValue)
							: undefined
					}
					value={
						value !== undefined
							? Array.isArray(value)
								? value.map(Number)
								: Number(value)
							: undefined
					}
					{...sliderProps}
				/>
			);
		}
		case "switch": {
			const { label, checked, disabled, ...switchProps } = props;
			return (
				<Switch
					interactive
					checked={checked}
					disabled={disabled}
					{...switchProps}
				>
					{label}
				</Switch>
			);
		}
		case "skeleton": {
			const { skeletonType = "default", children, ...skeletonProps } = props;
			if (skeletonType === "circle") {
				return <SkeletonCircle {...skeletonProps} />;
			}
			if (skeletonType === "text") {
				const { noOfLines, gap } = skeletonProps;
				return (
					<SkeletonText
						noOfLines={noOfLines !== undefined ? Number(noOfLines) : undefined}
						gap={gap}
						{...skeletonProps}
					/>
				);
			}
			return (
				<Skeleton {...skeletonProps}>
					{children && <PageRenderer content={children} />}
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
