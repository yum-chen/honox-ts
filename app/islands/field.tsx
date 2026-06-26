import { useState } from "hono/jsx";
import { Field as UIField, FieldGroup } from "../components/ui/field";
import { Textarea } from "../components/ui/textarea";

export interface FieldIslandProps {
	as?: "textarea" | "input"; // For now just supporting these
	label?: string;
	helperText?: string;
	errorText?: string;
	minLength?: number;
	id?: string;
	placeholder?: string;
	rows?: number;
	defaultValue?: string;
	class?: string;
}

export default function FieldIsland(props: FieldIslandProps) {
	const {
		as = "input",
		label,
		helperText,
		errorText,
		minLength,
		defaultValue = "",
		class: className,
		...rest
	} = props;
	const [value, setValue] = useState(defaultValue);

	return (
		<UIField
			id={rest.id}
			value={value}
			onValueChange={setValue}
			minLength={minLength}
			class={className}
		>
			<FieldGroup label={label} helperText={helperText} errorText={errorText}>
				{as === "textarea" ? (
					<Textarea {...rest} />
				) : (
					<input
						{...rest}
						value={value}
						onInput={(e: { target: { value: string } }) =>
							setValue((e.target as HTMLInputElement).value)}
						class={rest.class}
					/>
				)}
			</FieldGroup>
		</UIField>
	);
}
