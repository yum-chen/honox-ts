import FieldIsland from "../../../islands/field";
import { type FieldProps, FieldRoot } from "./field-root";

export interface SmartFieldProps extends FieldProps {
	interactive?: boolean;
}

export function Field(props: SmartFieldProps) {
	const { interactive, ...rest } = props;

	// In HonoX, islands are components that are hydrated on the client.
	// If interactive is true, we use the island.
	if (interactive) {
		return <FieldIsland {...rest} />;
	}

	return <FieldRoot {...rest} />;
}

export { useFieldContext } from "./field-context";
export * from "./field-root";
