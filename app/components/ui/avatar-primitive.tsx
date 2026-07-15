import { cx } from "design-system/css";
import type { AvatarVariantProps } from "design-system/recipes";
import { avatar } from "design-system/recipes";
import type { JSX, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";

type AvatarStyles = ReturnType<typeof avatar>;
type AvatarStatus = "idle" | "loading" | "loaded" | "error";

interface AvatarContextValue {
	styles: AvatarStyles;
	status: AvatarStatus;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

const useAvatarContext = () => {
	const context = useContext(AvatarContext);
	if (!context) {
		throw new Error("Avatar components must be wrapped in <Avatar.Root />");
	}
	return context;
};

interface RootProps extends AvatarVariantProps, PropsWithChildren {
	class?: string;
	status?: AvatarStatus;
}

function Root(props: RootProps) {
	const [variantProps, localProps] = avatar.splitVariantProps(props);
	const {
		children,
		class: classProp,
		status = "idle",
		...restProps
	} = localProps;
	const styles = avatar(variantProps);

	return (
		<AvatarContext.Provider value={{ styles, status }}>
			<div
				class={cx(styles.root, classProp)}
				data-scope="avatar"
				data-part="root"
				data-state={status}
				{...restProps}
			>
				{children}
			</div>
		</AvatarContext.Provider>
	);
}

interface ImageProps {
	src?: string;
	alt?: string;
	class?: string;
	onLoad?: () => void;
	onError?: () => void;
}

function Image(props: ImageProps) {
	const { src, alt, class: classProp, ...rest } = props;
	const { styles, status } = useAvatarContext();

	return (
		<img
			src={src}
			alt={alt}
			class={cx(styles.image, classProp)}
			draggable="false"
			// @ts-expect-error - referrerPolicy is valid on img
			referrerPolicy="no-referrer"
			data-scope="avatar"
			data-part="image"
			data-state={status}
			{...rest}
		/>
	);
}

interface FallbackProps extends PropsWithChildren {
	class?: string;
}

function Fallback(props: FallbackProps) {
	const { children, class: classProp, ...rest } = props;
	const { styles, status } = useAvatarContext();

	return (
		<span
			class={cx(styles.fallback, classProp)}
			data-scope="avatar"
			data-part="fallback"
			data-state={status}
			{...rest}
		>
			{children}
		</span>
	);
}

const getInitials = (name: string) => {
	const names = name.trim().split(" ");
	const firstName = names[0] || "";
	const lastName = names.length > 1 ? names[names.length - 1] : "";
	return firstName && lastName ? `${firstName[0]}${lastName[0]}` : firstName[0];
};

const UserIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<title>User</title>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</svg>
);

interface AvatarBaseProps extends RootProps {
	src?: string;
	alt?: string;
	name?: string;
	fallback?: JSX.Element;
	status?: "idle" | "loading" | "loaded" | "error";
}

function AvatarBase(props: AvatarBaseProps) {
	const {
		src,
		alt,
		name,
		fallback,
		status = "idle",
		children,
		...rest
	} = props;

	const showImage = src && (status === "loaded" || status === "idle");

	return (
		<Root {...rest} status={status}>
			{showImage && <Image src={src} alt={alt} />}
			{!showImage && (
				<Fallback>
					{fallback || (name ? getInitials(name) : <UserIcon />)}
				</Fallback>
			)}
			{children}
		</Root>
	);
}

export type { AvatarBaseProps };
export { AvatarBase, Fallback, getInitials, Image, Root };
