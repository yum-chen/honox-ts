import { css, cx } from "design-system/css";
import { button } from "design-system/recipes";
import { useState } from "hono/jsx";
import { Field } from "../components/ui/field";
import { Stack } from "../components/ui/stack";
import { Switch } from "../components/ui/switch";
import { Text } from "../components/ui/text";
import { Textarea } from "../components/ui/textarea";
import { toaster } from "../components/ui/toast";
import { Tooltip } from "../components/ui/tooltip";
import { InfoIcon } from "../icons/info";
import { saveConfigsFields, SettingsSaveError } from "../utils/settings-save";
import { useSettingsHighlight } from "../utils/use-settings-highlight";
import { useGitToken } from "./git-token-banner";

export interface BlogSettingsFormProps {
	initial: {
		showAuthor: boolean;
		showReadTime: boolean;
		excludeUntranslatedFromSearch: boolean;
		newsletterHeading: string;
		newsletterDescription: string;
	};
}

export default function BlogSettingsForm({ initial }: BlogSettingsFormProps) {
	useSettingsHighlight();
	const [form, setForm] = useState(initial);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { token } = useGitToken();
	const readOnly = !token;

	const handleSave = async () => {
		setSaving(true);
		setError(null);
		try {
			await saveConfigsFields(
				{
					blog: {
						showAuthor: form.showAuthor,
						showReadTime: form.showReadTime,
						excludeUntranslatedFromSearch: form.excludeUntranslatedFromSearch,
						newsletterHeading: form.newsletterHeading.trim(),
						newsletterDescription: form.newsletterDescription.trim(),
					},
				},
				"Update blog settings",
			);
			toaster.success("Updated blog settings.", {
				description: "Committed to main — live once the site rebuilds.",
			});
		} catch (err) {
			const message =
				err instanceof SettingsSaveError || err instanceof Error
					? err.message
					: "Failed to save blog settings.";
			toaster.error(message);
			setError(message);
		} finally {
			setSaving(false);
		}
	};

	return (
		<Stack direction="column" gap="4" class={css({ alignItems: "stretch" })}>
			<Stack id="showAuthor" align="center" justify="space-between" class={css({ p: "2", borderRadius: "md", transition: "all 0.3s" })}>
				<Stack direction="horizontal" align="center" gap="1.5">
					<Text size="sm">Show author byline</Text>
					<Tooltip content="Display the author's name, avatar, and publication date on blog posts." placement="top" showArrow>
						<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
					</Tooltip>
				</Stack>
				<Switch
					checked={form.showAuthor}
					onCheckedChange={(details: { checked: boolean }) =>
						setForm((f) => ({ ...f, showAuthor: details.checked }))
					}
					disabled={readOnly}
				/>
			</Stack>
			<Stack id="showReadTime" align="center" justify="space-between" class={css({ p: "2", borderRadius: "md", transition: "all 0.3s" })}>
				<Stack direction="horizontal" align="center" gap="1.5">
					<Text size="sm">Show read time</Text>
					<Tooltip content="Display the estimated reading time at the top of blog posts." placement="top" showArrow>
						<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
					</Tooltip>
				</Stack>
				<Switch
					checked={form.showReadTime}
					onCheckedChange={(details: { checked: boolean }) =>
						setForm((f) => ({ ...f, showReadTime: details.checked }))
					}
					disabled={readOnly}
				/>
			</Stack>
			<Stack id="excludeUntranslatedFromSearch" align="center" justify="space-between" class={css({ p: "2", borderRadius: "md", transition: "all 0.3s" })}>
				<Stack direction="horizontal" align="center" gap="1.5">
					<Text size="sm">Exclude untranslated posts from search</Text>
					<Tooltip content="Hide posts in the search index if they are not translated into the current locale." placement="top" showArrow>
						<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
					</Tooltip>
				</Stack>
				<Switch
					checked={form.excludeUntranslatedFromSearch}
					onCheckedChange={(details: { checked: boolean }) =>
						setForm((f) => ({
							...f,
							excludeUntranslatedFromSearch: details.checked,
						}))
					}
					disabled={readOnly}
				/>
			</Stack>

			<Field
				id="newsletterHeading"
				label={
					<Stack direction="horizontal" align="center" gap="1.5">
						<span>Newsletter heading</span>
						<Tooltip content="The title text shown in the newsletter subscription section." placement="top" showArrow>
							<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
						</Tooltip>
					</Stack>
				}
				value={form.newsletterHeading}
				onValueChange={(value: string) =>
					setForm((f) => ({ ...f, newsletterHeading: value }))
				}
				disabled={readOnly}
			/>
			<Textarea
				id="newsletterDescription"
				label={
					<Stack direction="horizontal" align="center" gap="1.5">
						<span>Newsletter description</span>
						<Tooltip content="A brief description or call-to-action shown below the newsletter heading." placement="top" showArrow>
							<span class={css({ display: "inline-flex", cursor: "help", color: "fg.muted" })}><InfoIcon width="14" height="14" /></span>
						</Tooltip>
					</Stack>
				}
				rows={3}
				value={form.newsletterDescription}
				onValueChange={(value: string) =>
					setForm((f) => ({ ...f, newsletterDescription: value }))
				}
				disabled={readOnly}
			/>

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
