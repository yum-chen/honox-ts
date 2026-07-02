import { Combobox } from "../components/ui";

const items = [
	{ label: "React", value: "react" },
	{ label: "Solid", value: "solid" },
	{ label: "Svelte", value: "svelte" },
	{ label: "Vue", value: "vue" },
	{ label: "Angular", value: "angular" },
];

export default function TestComboboxPage() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Combobox Test Page</h1>
			<Combobox
				items={items}
				placeholder="Select a framework..."
				interactive
			/>
		</div>
	);
}
