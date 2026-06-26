import { createContext, useContext } from "hono/jsx";

export interface FieldContextValue {
	id: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	labelId: string;
	helperTextId: string;
	errorTextId: string;
	hasHelperText: boolean;
	hasErrorText: boolean;
	setInvalid?: (invalid: boolean) => void;
}

export const FieldContext = createContext<FieldContextValue | null>(null);

export const useFieldContext = () => useContext(FieldContext);
