import { css, cx } from "design-system/css";
import { button } from "design-system/recipes";
import { useState } from "hono/jsx";
import { Field } from "../components/ui/field";
import { Stack } from "../components/ui/stack";
import { Switch } from "../components/ui/switch";
import { TagsField } from "../components/ui/tags-field";
import { Text } from "../components/ui/text";
import { toaster } from "../components/ui/toast";
import { Tooltip } from "../components/ui/tooltip";
import { InfoIcon } from "../icons/info";
import { saveConfigsFields, SettingsSaveError } from "../utils/settings-save";
import { useSettingsHighlight } from "../utils/use-settings-highlight";
import { useGitToken } from "./git-token-banner";

export interface DocsSettingsFormProps {
	initial: {
		showHydrationTierBadge: boolean;
		fallbackLabel: string;
		docOrder: string[];
		docsUi: {
			edit: string;
			admin: string;
			menu: string;
			previous: string;
			next: string;
		};
	};
	/** Read-only summary of the sidenav groups — restructuring groups is a
	 * content change, not a simple setting, so it's shown but not editable
	 * here (manage it in the CMS's Configs entry instead). */
	groupsSummary: string;
}

const labelClass = css({ fontWeight: "medium", mb: "1.5" });

export default function DocsSettingsForm({
	initial,
	groupsSummary,
}: DocsSettingsFormProps) {
	useSettingsHighlight();
	const [form, setForm] = useState(initial);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { token } = useGitToken();
	const readOnly = !token;

	const setDocsUi = (patch: Partial<typeof initial.docsUi>) =>
		setForm((f) => ({ ...f, docsUi: { ...f.docsUi, ...patch } }));

	const handleSave = async () => {
		setSaving(true);
		setError(null);
		try {
			await saveConfigsFields(
				{
					docs: { showHydrationTierBadge: form.showHydrationTierBadge },
					fallbackLabel: form.fallbackLabel.trim() || "Other",
					docOrder: form.docOrder,
					docsUi: {
						edit: form.docsUi.edit.trim() || "Edit",
						admin: form.docsUi.admin.trim() || "Admin",
						menu: form.docsUi.menu.trim() || "Menu",
						previous: form.docsUi.previous.trim() || "Previous",
						next: form.docsUi.next.trim() || "Next",
					},
				},
				"Update docs settings",
			);
			toaster.success("Updated docs settings.", {
				description: "Committed to main — live once the site rebuilds.",
			});
		} catch (err) {
			const message =
				err instanceof SettingsSaveError || err instanceof Error
					? err.message
					: "Failed to save docs settings.";
			toaster.error(message);
			setError(message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<Stack direction="column" gap="4" class={css({ alignItems: "stretch" })}>
			<Stack id="showHydrationTierBadge" align="center" justify="space-between" class={css({ p: "2", borderRadius: "md", transition: "all 0.3s" })}>
				<Stack direction="horizontal" align="center" gap="1.5">
					<Text size="sm">Show hydration tier badge</Text>
					<Tooltip content="Show visual badges indicating the hydration tier (e.g. Auto-interactive, Presentational) on documentation pages." placement="top" showArrow>
						<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
					</Tooltip>
				</Stack>
				<Switch
					checked={form.showHydrationTierBadge}
					onCheckedChange={(details: { checked: boolean }) =>
						setForm((f) => ({
							...f,
							showHydrationTierBadge: details.checked,
						}))
					}
					disabled={readOnly}
				/>
			</Stack>

			<Field
				id="fallbackLabel"
				label={
					<Stack direction="horizontal" align="center" gap="1.5">
						<span>Fallback group label</span>
						<Tooltip content="The default group name used in the documentation sidebar for pages without a specified group." placement="top" showArrow>
							<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
						</Tooltip>
					</Stack>
				}
				value={form.fallbackLabel}
				onValueChange={(value: string) =>
					setForm((f) => ({ ...f, fallbackLabel: value }))
				}
				disabled={readOnly}
			/>

			<TagsField
				id="docOrder"
				label={
					<Stack direction="horizontal" align="center" gap="1.5">
						<span>Explicit doc order</span>
						<Tooltip content="A list of document slugs defining the precise order of articles in the sidebar." placement="top" showArrow>
							<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
						</Tooltip>
					</Stack>
				}
				helperText="Doc slugs, in sidenav order — press Enter to add one. Docs not listed keep alphabetical order, appended after these."
				value={form.docOrder}
				onValueChange={(details: { value: string[] }) =>
					setForm((f) => ({ ...f, docOrder: details.value }))
				}
				disabled={readOnly}
			/>

			<div>
				<Text size="sm" class={labelClass}>
					Header / pager labels
				</Text>
				<Stack gap="3" wrap="wrap">
					<div class={css({ flex: "1", minWidth: "24" })}>
						<Field
							id="edit"
							label={
								<Stack direction="horizontal" align="center" gap="1.5">
									<span>Edit button</span>
									<Tooltip content="Custom translation label for the documentation Edit button in the header." placement="top" showArrow>
										<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
									</Tooltip>
								</Stack>
							}
							value={form.docsUi.edit}
							onValueChange={(value: string) => setDocsUi({ edit: value })}
							disabled={readOnly}
						/>
					</div>
					<div class={css({ flex: "1", minWidth: "24" })}>
						<Field
							id="admin"
							label={
								<Stack direction="horizontal" align="center" gap="1.5">
									<span>Admin button</span>
									<Tooltip content="Custom translation label for the documentation Admin button in the header." placement="top" showArrow>
										<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
									</Tooltip>
								</Stack>
							}
							value={form.docsUi.admin}
							onValueChange={(value: string) => setDocsUi({ admin: value })}
							disabled={readOnly}
						/>
					</div>
					<div class={css({ flex: "1", minWidth: "24" })}>
						<Field
							id="menu"
							label={
								<Stack direction="horizontal" align="center" gap="1.5">
									<span>Mobile menu toggle</span>
									<Tooltip content="Custom translation label for the documentation mobile menu toggle." placement="top" showArrow>
										<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
									</Tooltip>
								</Stack>
							}
							value={form.docsUi.menu}
							onValueChange={(value: string) => setDocsUi({ menu: value })}
							disabled={readOnly}
						/>
					</div>
					<div class={css({ flex: "1", minWidth: "24" })}>
						<Field
							id="previous"
							label={
								<Stack direction="horizontal" align="center" gap="1.5">
									<span>Previous doc label</span>
									<Tooltip content="Custom translation label prefix for the previous-doc link." placement="top" showArrow>
										<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
									</Tooltip>
								</Stack>
							}
							value={form.docsUi.previous}
							onValueChange={(value: string) => setDocsUi({ previous: value })}
							disabled={readOnly}
						/>
					</div>
					<div class={css({ flex: "1", minWidth: "24" })}>
						<Field
							id="next"
							label={
								<Stack direction="horizontal" align="center" gap="1.5">
									<span>Next doc label</span>
									<Tooltip content="Custom translation label prefix for the next-doc link." placement="top" showArrow>
										<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
									</Tooltip>
								</Stack>
							}
							value={form.docsUi.next}
							onValueChange={(value: string) => setDocsUi({ next: value })}
							disabled={readOnly}
						/>
					</div>
				</Stack>
			</div>

			<div>
				<Text size="sm" class={labelClass}>
					Sidenav groups
				</Text>
				<Text size="sm" class={css({ color: "fg.muted" })}>
					{groupsSummary} — restructure groups in the CMS's Configs entry.
				</Text>
			</div>

			{error && (
				<Text size="sm" class={css({ color: "fg.error" })}>
					{error}
				</Text>
			)}

			<Stack align="center" justify="end" gap="3">
				{readOnly && (
					<Text size="xs" class={css({ color: "fg.muted" })}>
						Connect a git host token above to edit.
					</Text>
				)}
				<button
					type="button"
					onClick={() => void handleSave()}
					disabled={saving || readOnly}
					class={cx(button({ variant: "solid", size: "sm" }))}
				>
					{saving ? "Saving..." : "Save changes"}
				</button>
			</Stack>
		</Stack>
	);
}
