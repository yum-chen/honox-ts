import { useState } from "hono/jsx";
import { type FieldProps, FieldRoot } from "../components/ui/field-primitive";

export default function FieldIsland(props: FieldProps) {
	const { validator, onInput, invalid: invalidProp, ...rest } = props;
	const [localInvalid, setLocalInvalid] = useState(invalidProp);

	const handleInput = (e: any) => {
		if (validator) {
			const value = e.target.value;
			const result = validator(value);
			setLocalInvalid(result === false || typeof result === "string");
		}
		if (onInput) {
			onInput(e);
		}
	};

	return <FieldRoot {...rest} invalid={localInvalid} onInput={handleInput} />;
}
