import { useState } from "hono/jsx";
import { css } from "../../styled-system/css";
import {
	Field,
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
} from "../components/ui/field";
import { Textarea } from "../components/ui/textarea";
import Fieldset from "./fieldset";

export default function ProfileForm() {
	const [bio, setBio] = useState("Short");
	const isInvalid = bio.length > 0 && bio.length < 10;

	return (
		<Fieldset
			legend="Profile Info"
			helperText="Update your profile information."
			errorText="This form has errors."
			invalid={isInvalid}
		>
			<Field>
				<FieldLabel for="name">Name</FieldLabel>
				<input
					id="name"
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
		</Fieldset>
	);
}
