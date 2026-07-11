import DatePickerIsland from "../../islands/date-picker";
import {
	ClearTrigger,
	Content,
	Control,
	DatePickerStructure,
	Input,
	type InteractiveDatePickerProps,
	Label,
	MonthSelect,
	NextTrigger,
	Positioner,
	PrevTrigger,
	RangeText,
	Root,
	Table,
	TableBody,
	TableCell,
	TableCellTrigger,
	TableHead,
	TableHeader,
	TableRow,
	Trigger,
	View,
	ViewControl,
	ViewTrigger,
	YearSelect,
} from "./date-picker-primitive";
import { shouldHydrate } from "./island-utils";

interface DatePickerProps extends InteractiveDatePickerProps {
	interactive?: boolean;
}

function DatePickerRoot(props: DatePickerProps) {
	const { interactive, ...rest } = props;

	// DatePicker forces hydration by default using shouldHydrate(interactive, true)
	const isInteractive = shouldHydrate(interactive, true);

	if (isInteractive) {
		return <DatePickerIsland {...rest} />;
	}

	return (
		<Root {...rest}>
			<DatePickerStructure placeholder={props.placeholder} name={props.name} />
		</Root>
	);
}

const DatePicker = Object.assign(DatePickerRoot, {
	Root,
	Label,
	Control,
	Input,
	Trigger,
	ClearTrigger,
	Positioner,
	Content,
	View,
	ViewControl,
	PrevTrigger,
	NextTrigger,
	ViewTrigger,
	RangeText,
	Table,
	TableHead,
	TableRow,
	TableHeader,
	TableBody,
	TableCell,
	TableCellTrigger,
	MonthSelect,
	YearSelect,
});

export type { DatePickerProps };
export {
	ClearTrigger,
	Content,
	Control,
	DatePicker,
	Input,
	Label,
	MonthSelect,
	NextTrigger,
	Positioner,
	PrevTrigger,
	RangeText,
	Root,
	Table,
	TableBody,
	TableCell,
	TableCellTrigger,
	TableHead,
	TableHeader,
	TableRow,
	Trigger,
	View,
	ViewControl,
	ViewTrigger,
	YearSelect,
};

export default DatePicker;
