import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import { Alert, AlertIcon, Heading, Stack } from "../../components/ui";

const statuses = ["info", "success", "warning", "error", "neutral"] as const;
const variants = ["subtle", "solid", "outline", "surface"] as const;

export default createRoute((c) => {
	return c.render(
		<div class={css({ p: "8" })}>
			<Heading as="h1" mb="8">Alert Visual Test</Heading>

			<div class={css({ display: "flex", flexDirection: "column", gap: "12" })}>
				{variants.map((variant) => (
					<section key={variant}>
						<Heading as="h2" mb="4" textTransform="capitalize">
							Variant: {variant}
						</Heading>
						<div class={css({ display: "flex", flexDirection: "column", gap: "4" })}>
							{statuses.map((status) => (
								<Alert
									key={status}
									status={status}
									variant={variant}
									title={`${status.charAt(0).toUpperCase() + status.slice(1)} Alert`}
									description="This is an alert description to test visuals."
									indicator={<AlertIcon />}
								/>
							))}
						</div>
					</section>
				))}
			</div>
		</div>,
	);
});
