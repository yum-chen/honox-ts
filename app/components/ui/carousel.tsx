import type { JSX } from "hono/jsx";
import CarouselIsland from "../../islands/carousel";
import {
	AutoplayTrigger,
	Context,
	Control,
	Indicator,
	IndicatorGroup,
	Item,
	ItemGroup,
	NextTrigger,
	PrevTrigger,
	ProgressText,
	Root as RootPrimitive,
	type RootProps,
	RootProvider,
} from "./carousel-primitive";
import { shouldHydrate } from "./island-utils";

export interface CarouselProps extends Omit<RootProps, "children" | "slideCount"> {
	/** Forces hydration as an island. Defaults to `true`. */
	interactive?: boolean;
	/** The slide contents. `slideCount` is derived from its length. */
	slides: JSX.Element[];
	/** Renders `PrevTrigger`/`NextTrigger` in the default `Control`. Default `true`. */
	showControls?: boolean;
	/** Renders an `IndicatorGroup` dot per page in the default `Control`. Default `true`. */
	showIndicators?: boolean;
	/** Renders an `AutoplayTrigger` in the default `Control`. Default `false`. */
	showAutoplayTrigger?: boolean;
	/** Custom class applied to every generated `Item`. */
	itemClass?: string;
}

export interface CarouselRootProps extends RootProps {
	/** Forces hydration as an island. Defaults to `true`. */
	interactive?: boolean;
}

function Root(props: CarouselRootProps) {
	const { interactive, ...rest } = props;

	if (shouldHydrate(interactive, true)) {
		return <CarouselIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

/**
 * Data-driven convenience component: composes `ItemGroup`/`Item` from
 * `slides` and a default `Control` with prev/next triggers and indicator
 * dots. For full manual composition, use `Carousel.Root` and the exported
 * parts directly instead.
 */
function Carousel(props: CarouselProps) {
	const {
		slides,
		showControls = true,
		showIndicators = true,
		showAutoplayTrigger = false,
		itemClass,
		interactive,
		...rest
	} = props;

	return (
		<Root {...rest} interactive={interactive} slideCount={slides.length}>
			<ItemGroup>
				{slides.map((slide, index) => (
					<Item index={index} class={itemClass}>
						{slide}
					</Item>
				))}
			</ItemGroup>
			{(showControls || showIndicators || showAutoplayTrigger) && (
				<Control>
					{showControls && <PrevTrigger />}
					{showIndicators && <IndicatorGroup />}
					{showAutoplayTrigger && <AutoplayTrigger />}
					{showControls && <NextTrigger />}
				</Control>
			)}
		</Root>
	);
}

const CarouselComponent = Object.assign(Carousel, {
	Root,
	RootProvider,
	ItemGroup,
	Item,
	Control,
	PrevTrigger,
	NextTrigger,
	IndicatorGroup,
	Indicator,
	AutoplayTrigger,
	ProgressText,
	Context,
});

export {
	AutoplayTrigger,
	CarouselComponent as Carousel,
	Context,
	Control,
	Indicator,
	IndicatorGroup,
	Item,
	ItemGroup,
	NextTrigger,
	PrevTrigger,
	ProgressText,
	Root,
	RootProvider,
};

export default CarouselComponent;
