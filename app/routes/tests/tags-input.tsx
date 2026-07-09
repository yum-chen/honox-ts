import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import { TagsInput } from "../../components/ui";
import { Heading } from "../../components/ui/heading";

export default createRoute((c) => {
	return c.render(
		<div class={css({ py: "12", px: "6", maxW: "xl", mx: "auto" })}>
			<div class={css({ display: "flex", flexDirection: "column", gap: "12" })}>
				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Default (Outline)</Heading>
					<TagsInput
						defaultValue={["React", "Solid", "Svelte"]}
						placeholder="Add frameworks"
						interactive={true}
					/>
				</div>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Subtle</Heading>
					<TagsInput
						variant="subtle"
						defaultValue={["Panda CSS", "Park UI"]}
						placeholder="Add technologies"
						interactive={true}
					/>
				</div>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Surface</Heading>
					<TagsInput
						variant="surface"
						defaultValue={["TypeScript", "HonoX"]}
						placeholder="Add languages"
						interactive={true}
					/>
				</div>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Sizes (xs)</Heading>
					<TagsInput
						size="xs"
						defaultValue={["Small", "Tag"]}
						placeholder="Add tags"
						interactive={true}
					/>
				</div>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Sizes (lg)</Heading>
					<TagsInput
						size="lg"
						defaultValue={["Large", "Tag"]}
						placeholder="Add tags"
						interactive={true}
					/>
				</div>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "4" })}
				>
					<Heading size="2xl">Tags Input - Max Tags (3)</Heading>
					<TagsInput
						max={3}
						defaultValue={["One", "Two"]}
						placeholder="Max 3 tags allowed"
						interactive={true}
					/>
				</div>
			</div>
		</div>,
	);
});
