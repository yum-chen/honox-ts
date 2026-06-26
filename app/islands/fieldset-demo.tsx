import { useState } from "hono/jsx";
import { css } from "../../styled-system/css";
import {
	Field,
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
} from "../components/ui/field";
import {
	Fieldset,
	FieldsetContent,
	FieldsetControl,
	FieldsetHelperText,
	FieldsetLegend,
} from "../components/ui/fieldset";
import { Textarea } from "../components/ui/textarea";

export default function FieldsetDemo() {
	const [bio, setBio] = useState("Short");
	const isInvalid = bio.length > 0 && bio.length < 10;

	return (
		<Fieldset>
			<FieldsetControl>
				<FieldsetLegend>Profile Info</FieldsetLegend>
				<FieldsetHelperText>Update your profile information.</FieldsetHelperText>
			</FieldsetControl>
			<FieldsetContent>
				<Field>
					<FieldLabel>Name</FieldLabel>
					<input
						type="text"
						placeholder="John Doe"
						class={css({
							borderWidth: "1px",
							borderColor: "border",
							borderRadius: "md",
							px: "3",
							py: "2",
						})}
					/>
				</Field>
				<Field>
					<FieldLabel for="bio">Bio</FieldLabel>
					<Textarea
						id="bio"
						placeholder="A short bio"
						rows={4}
						value={bio}
						onInput={(e: any) => setBio(e.target.value)}
						aria-invalid={isInvalid ? "true" : "false"}
						data-invalid={isInvalid ? "" : undefined}
					/>
					<FieldHelperText>At least 10 characters.</FieldHelperText>
					{isInvalid && (
						<FieldErrorText>Bio must be at least 10 characters.</FieldErrorText>
					)}
				</Field>
			</FieldsetContent>
		</Fieldset>
	);
}
