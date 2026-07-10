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
	Slider,
	Stack,
	Switch,
	Text,
} from "./ui";

interface ComponentBlock {
	type: string;
	// biome-ignore lint/suspicious/noExplicitAny: component properties are parsed from dynamic JSON
	[key: string]: any;
}

interface PageRendererProps {
	content: ComponentBlock[];
}

function RenderBlock({
	block,
	...extraProps
}: {
	block: ComponentBlock;
	// biome-ignore lint/suspicious/noExplicitAny: block properties are parsed from dynamic JSON and forwarded down
	[key: string]: any;
}) {
	const { type, ...props } = block;

	switch (type) {
		case "stack": {
			const { children, ...stackProps } = props;
			return (
				<Stack {...stackProps} {...extraProps}>
					<PageRenderer content={children} />
				</Stack>
			);
		}
		case "button": {
			const { text, ...buttonProps } = props;
			return (
				<Button {...buttonProps} {...extraProps}>
					{text}
				</Button>
			);
		}
		case "badge": {
			const { text, ...badgeProps } = props;
			return (
				<Badge {...badgeProps} {...extraProps}>
					{text}
				</Badge>
			);
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
					{...extraProps}
				/>
			);
		}
		case "heading": {
			const { text, ...headingProps } = props;
			return (
				<Heading {...headingProps} {...extraProps}>
					{text}
				</Heading>
			);
		}
		case "text": {
			const { content, ...textProps } = props;
			return (
				<Text {...textProps} {...extraProps}>
					{content}
				</Text>
			);
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
					{...extraProps}
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
					{...extraProps}
				>
					{label}
				</Checkbox>
			);
		}
		case "collapsible": {
			const {
				trigger,
				triggerText,
				showIndicator,
				indicatorPlacement,
				open,
				disabled,
				children,
				...collapsibleProps
			} = props;
			const triggerElement =
				trigger && trigger.length > 0 ? (
					<RenderBlock block={trigger[0]} />
				) : (
					triggerText || "Toggle"
				);
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
					trigger={triggerElement}
					indicator={indicator}
					indicatorPlacement={indicatorPlacement}
					defaultOpen={open}
					disabled={disabled}
					content={<div>{children && <PageRenderer content={children} />}</div>}
					{...collapsibleProps}
					{...extraProps}
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
					{...extraProps}
				/>
			);
		}
		case "dialog": {
			const {
				title,
				description,
				trigger: triggerProp,
				triggerText,
				confirmText,
				cancelText,
				role,
				children,
				...dialogProps
			} = props;
			const trigger =
				triggerProp && triggerProp.length > 0 ? (
					<RenderBlock block={triggerProp[0]} />
				) : triggerText ? (
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
					{...extraProps}
				>
					{children && <PageRenderer content={children} />}
				</Dialog>
			);
		}
		case "drawer": {
			const {
				title,
				description,
				trigger: triggerProp,
				triggerText,
				confirmText,
				cancelText,
				children,
				...drawerProps
			} = props;
			const trigger =
				triggerProp && triggerProp.length > 0 ? (
					<RenderBlock block={triggerProp[0]} />
				) : triggerText ? (
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
					{...extraProps}
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
					{...extraProps}
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
					{...extraProps}
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
					{...extraProps}
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
					{...extraProps}
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
					{...extraProps}
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
			const content = children ? (
				<PageRenderer content={children} />
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
					{...extraProps}
				>
					{content}
				</Popover>
			);
		}
		case "skeleton": {
			const { variant, noOfLines, loaded, children, ...skeletonProps } = props;
			if (variant === "text") {
				return (
					<Skeleton
						loaded={loaded}
						class={css({ width: "full" })}
						{...skeletonProps}
						{...extraProps}
					>
						{children ? (
							<PageRenderer content={children} />
						) : (
							<div
								class={css({
									display: "flex",
									flexDirection: "column",
									gap: "2",
									width: "full",
								})}
							>
								{Array.from({ length: noOfLines || 3 }).map((_, index) => (
									<Skeleton
										key={index}
										class={css({
											height: "4",
											width: "full",
											_last: { maxWidth: "80%" },
										})}
									/>
								))}
							</div>
						)}
					</Skeleton>
				);
			}
			return (
				<Skeleton
					circle={variant === "circle"}
					loaded={loaded}
					{...skeletonProps}
					{...extraProps}
				>
					{children && <PageRenderer content={children} />}
				</Skeleton>
			);
		}
		case "paginatedTable":
		case "paginated-table": {
			return <PaginatedTable {...props} {...extraProps} />;
		}
		case "pagination": {
			return <Pagination interactive {...props} {...extraProps} />;
		}
		case "progress": {
			return <Progress {...props} {...extraProps} />;
		}
		case "radioGroup":
		case "radio-group": {
			return <RadioGroup interactive {...props} {...extraProps} />;
		}
		case "segmentGroup":
		case "segment-group": {
			return <SegmentGroup interactive {...props} {...extraProps} />;
		}
		case "slider": {
			return <Slider interactive {...props} {...extraProps} />;
		}
		case "switch": {
			return <Switch interactive {...props} {...extraProps} />;
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
