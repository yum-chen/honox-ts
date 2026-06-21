import { useState } from "hono/jsx";
import { stack } from "../../styled-system/patterns";
import { Button } from "../components/ui/button";
import {
	Dialog,
	DialogBackdrop,
	DialogCloseTrigger,
	DialogContent,
	DialogDescription,
	DialogPositioner,
	DialogTitle,
} from "../components/ui/dialog";
import {
	Sidebar,
	SidebarBackdrop,
	SidebarBody,
	SidebarCloseTrigger,
	SidebarContent,
	SidebarHeader,
	SidebarPositioner,
	SidebarTitle,
} from "../components/ui/sidebar";

export default function Navigation() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	console.log("Navigation render", { isModalOpen, isSidebarOpen });

	return (
		<div class={stack({ direction: "row", gap: "4" })}>
			<Button id="open-modal" onClick={() => setIsModalOpen(true)}>
				Open Modal
			</Button>
			<Button
				id="open-sidebar"
				variant="outline"
				onClick={() => setIsSidebarOpen(true)}
			>
				Open Sidebar
			</Button>

			{/* Modal Implementation */}
			{isModalOpen && (
				<Dialog>
					<DialogBackdrop onClick={() => setIsModalOpen(false)} />
					<DialogPositioner>
						<DialogContent>
							<div class={stack({ gap: "4" })}>
								<div class={stack({ gap: "1" })}>
									<DialogTitle>Welcome to Park UI</DialogTitle>
									<DialogDescription>
										This is a modal component ported to HonoX.
									</DialogDescription>
								</div>
								<div
									class={stack({
										direction: "row",
										justifyContent: "flex-end",
										gap: "3",
									})}
								>
									<Button
										id="close-modal-cancel"
										variant="outline"
										onClick={() => setIsModalOpen(false)}
									>
										Cancel
									</Button>
									<Button
										id="close-modal-confirm"
										onClick={() => setIsModalOpen(false)}
									>
										Confirm
									</Button>
								</div>
							</div>
							<DialogCloseTrigger
								id="close-modal-x"
								onClick={() => setIsModalOpen(false)}
							>
								✕
							</DialogCloseTrigger>
						</DialogContent>
					</DialogPositioner>
				</Dialog>
			)}

			{/* Sidebar Implementation */}
			{isSidebarOpen && (
				<Sidebar>
					<SidebarBackdrop onClick={() => setIsSidebarOpen(false)} />
					<SidebarPositioner>
						<SidebarContent>
							<SidebarHeader>
								<SidebarTitle>Navigation Menu</SidebarTitle>
							</SidebarHeader>
							<SidebarBody>
								<nav>
									<ul class={stack({ gap: "2" })}>
										<li>
											<Button
												variant="ghost"
												width="full"
												justifyContent="start"
											>
												Dashboard
											</Button>
										</li>
										<li>
											<Button
												variant="ghost"
												width="full"
												justifyContent="start"
											>
												Settings
											</Button>
										</li>
										<li>
											<Button
												variant="ghost"
												width="full"
												justifyContent="start"
											>
												Profile
											</Button>
										</li>
									</ul>
								</nav>
							</SidebarBody>
							<SidebarCloseTrigger
								id="close-sidebar-x"
								onClick={() => setIsSidebarOpen(false)}
							>
								✕
							</SidebarCloseTrigger>
						</SidebarContent>
					</SidebarPositioner>
				</Sidebar>
			)}
		</div>
	);
}
