import {
	FieldsetContent,
	FieldsetControl,
	FieldsetErrorText,
	FieldsetHelperText,
	FieldsetLegend,
	Fieldset as UIFieldset,
} from "../components/ui/fieldset";

export interface FieldsetProps {
	children?: any;
	legend?: string;
	helperText?: string;
	errorText?: string;
	invalid?: boolean;
	disabled?: boolean;
	class?: string;
	[key: string]: any;
}

export default function Fieldset(props: FieldsetProps) {
	const {
		children,
		legend,
		helperText,
		errorText,
		invalid,
		class: classProp,
		...rest
	} = props;

	return (
		<UIFieldset invalid={invalid} class={classProp} {...rest}>
			{(legend || helperText || (invalid && errorText)) && (
				<FieldsetControl>
					{legend && <FieldsetLegend>{legend}</FieldsetLegend>}
					{helperText && <FieldsetHelperText>{helperText}</FieldsetHelperText>}
					{invalid && errorText && (
						<FieldsetErrorText>{errorText}</FieldsetErrorText>
					)}
				</FieldsetControl>
			)}
			<FieldsetContent>{children}</FieldsetContent>
		</UIFieldset>
	);
}
