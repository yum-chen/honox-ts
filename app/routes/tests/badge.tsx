import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import { Badge, Heading } from "../../components/ui";

const palettes = [
	"red",
	"orange",
	"amber",
	"green",
	"blue",
	"cyan",
	"purple",
	"slate",
] as const;
const variants = ["solid", "subtle", "outline", "surface"] as const;
const sizes = ["sm", "md", "lg", "xl", "2xl"] as const;

export default createRoute((c) => {
	return c.render(
		<div class={css({ p: "8", bg: "bg.canvas" })}>
			<Heading as="h1" mb="8">
				Badge Visual Test
			</Heading>

			<div
				class={css({
					display: "flex",
					flexDirection: "column",
					gap: "12",
				})}
			>
				{/* Variants across palettes */}
				{variants.map((variant) => (
					<section key={variant}>
						<Heading as="h2" mb="4" textTransform="capitalize">
							Variant: {variant}
						</Heading>
						<div
							class={css({
								display: "flex",
								gap: "4",
								flexWrap: "wrap",
								alignItems: "center",
							})}
						>
							{palettes.map((palette) => (
								<Badge
									key={`${variant}-${palette}`}
									variant={variant}
									colorPalette={palette}
								>
									{palette}
								</Badge>
							))}
						</div>
					</section>
				))}

				{/* Sizes */}
				<section>
					<Heading as="h2" mb="4">
						Sizes
					</Heading>
					<div
						class={css({
							display: "flex",
							gap: "4",
							flexWrap: "wrap",
							alignItems: "center",
						})}
					>
						{sizes.map((size) => (
							<Badge
								key={size}
								size={size}
								variant="subtle"
								colorPalette="blue"
							>
								{size}
							</Badge>
						))}
					</div>
				</section>
			</div>
		</div>,
	);
});
