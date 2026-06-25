import { wrap } from "../../styled-system/patterns";
import { Button } from "../components/ui/button";
import { toast } from "../lib/toast";

/**
 * Demo-only island wiring trigger buttons to the imperative `toast()` API.
 */
export default function ToastDemo() {
	return (
		<div class={wrap({ gap: "3", alignItems: "center" })}>
			<Button
				variant="outline"
				onClick={() =>
					toast({
						title: "Notification sent",
						description: "Your message has been delivered.",
					})
				}
			>
				Show toast
			</Button>
			<Button
				variant="outline"
				onClick={() =>
					toast({
						title: "Something went wrong",
						description: "There was a problem processing your request.",
						type: "error",
					})
				}
			>
				Show error toast
			</Button>
		</div>
	);
}
