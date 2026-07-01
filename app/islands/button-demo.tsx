import { Button } from "../components/ui/button";

export default function ButtonDemo() {
	return (
		<Button
			interactive
			onClick={async () => {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				alert("Finished!");
			}}
		>
			Interactive
		</Button>
	);
}
