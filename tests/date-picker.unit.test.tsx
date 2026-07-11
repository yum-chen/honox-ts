import { expect, test, describe } from "bun:test";
import { DatePicker, parseDate } from "../app/components/ui/date-picker";

describe("DatePicker Unit Tests", () => {
	test("should parse date string correctly", () => {
		const parsed = parseDate("2026-07-15");
		expect(parsed.year).toBe(2026);
		expect(parsed.month).toBe(7);
		expect(parsed.day).toBe(15);
		expect(parsed.toString()).toBe("2026-07-15");
	});

	test("should render main anatomical structure", () => {
		const html = (
			<DatePicker interactive={false} selectionMode="single">
				<DatePicker.Label>Choose Date</DatePicker.Label>
				<DatePicker.Control>
					<DatePicker.Input placeholder="YYYY-MM-DD" />
					<DatePicker.Trigger />
					<DatePicker.ClearTrigger />
				</DatePicker.Control>
				<DatePicker.Positioner>
					<DatePicker.Content>
						<DatePicker.View view="day">
							<DatePicker.Context>
								{(datePicker) => (
									<>
										<DatePicker.ViewControl>
											<DatePicker.PrevTrigger />
											<DatePicker.ViewTrigger>
												<DatePicker.RangeText />
											</DatePicker.ViewTrigger>
											<DatePicker.NextTrigger />
										</DatePicker.ViewControl>
										<DatePicker.Table>
											<DatePicker.TableHead>
												<DatePicker.TableRow>
													{datePicker.weekDays.map((weekDay, id) => (
														<DatePicker.TableHeader key={id}>
															{weekDay.short}
														</DatePicker.TableHeader>
													))}
												</DatePicker.TableRow>
											</DatePicker.TableHead>
											<DatePicker.TableBody>
												{datePicker.weeks.map((week, id) => (
													<DatePicker.TableRow key={id}>
														{week.map((day, id) => (
															<DatePicker.TableCell key={id} value={day}>
																<DatePicker.TableCellTrigger>
																	{day.day}
																</DatePicker.TableCellTrigger>
															</DatePicker.TableCell>
														))}
													</DatePicker.TableRow>
												))}
											</DatePicker.TableBody>
										</DatePicker.Table>
									</>
								)}
							</DatePicker.Context>
						</DatePicker.View>
					</DatePicker.Content>
				</DatePicker.Positioner>
			</DatePicker>
		).toString();

		// Label and Control assertions
		expect(html).toContain('data-part="label"');
		expect(html).toContain("Choose Date");
		expect(html).toContain('data-part="control"');
		expect(html).toContain('data-part="input"');

		// Triggers assertions
		expect(html).toContain('data-part="trigger"');
		expect(html).toContain('data-part="clear-trigger"');

		// View and Positioner assertions
		expect(html).toContain('data-part="positioner"');
		expect(html).toContain('data-part="content"');
		expect(html).toContain('data-part="view"');
		expect(html).toContain('data-part="view-control"');
		expect(html).toContain('data-part="range-text"');

		// Table assertions
		expect(html).toContain('data-part="table"');
		expect(html).toContain('data-part="table-header"');
		expect(html).toContain('data-part="table-row"');
		expect(html).toContain('data-part="table-cell"');
		expect(html).toContain('data-part="table-cell-trigger"');
	});

	test("should format selected values in DatePickerValueText", () => {
		const val = [parseDate("2026-07-15")];
		const html = (
			<DatePicker interactive={false} value={val}>
				<DatePicker.ValueText />
			</DatePicker>
		).toString();

		expect(html).toContain("2026-07-15");
	});

	test("should render preset triggers", () => {
		const html = (
			<DatePicker interactive={false}>
				<DatePicker.PresetTrigger value="last7Days">Last 7 Days</DatePicker.PresetTrigger>
			</DatePicker>
		).toString();

		expect(html).toContain('data-part="preset-trigger"');
		expect(html).toContain('data-value="last7Days"');
		expect(html).toContain("Last 7 Days");
	});
});
