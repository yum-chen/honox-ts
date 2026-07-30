export interface SettingsSearchItem {
	id: string; // The ID of the field or selector (e.g., 'brandName', 'showAuthor', etc.)
	label: string; // The text label of the field (e.g., 'Brand name')
	description: string; // The full description or tooltip text
	section: string; // The settings section slug (e.g., 'home', 'blog', 'docs', 'pms', 'cms-admin')
	sectionName: string; // The title of the settings section
}

export const SETTINGS_SEARCH_INDEX: SettingsSearchItem[] = [
	// Homepage & Branding (home)
	{
		id: "brandName",
		label: "Brand name",
		description: "The name of your brand, displayed in the site header, footer, and navigation.",
		section: "home",
		sectionName: "Homepage & Branding"
	},
	{
		id: "titleFallback",
		label: "<title> fallback",
		description: "The default HTML page title used when a specific page title is not defined.",
		section: "home",
		sectionName: "Homepage & Branding"
	},
	{
		id: "footerCopyright",
		label: "Footer copyright",
		description: "The copyright notice text displayed at the very bottom of every page.",
		section: "home",
		sectionName: "Homepage & Branding"
	},
	{
		id: "footerLinks",
		label: "Footer links",
		description: "Custom external or internal navigation links displayed in the footer section.",
		section: "home",
		sectionName: "Homepage & Branding"
	},
	// Blog (blog)
	{
		id: "showAuthor",
		label: "Show author byline",
		description: "Display the author's name, avatar, and publication date on blog posts.",
		section: "blog",
		sectionName: "Blog"
	},
	{
		id: "showReadTime",
		label: "Show read time",
		description: "Display the estimated reading time at the top of blog posts.",
		section: "blog",
		sectionName: "Blog"
	},
	{
		id: "excludeUntranslatedFromSearch",
		label: "Exclude untranslated posts from search",
		description: "Hide posts in the search index if they are not translated into the current locale.",
		section: "blog",
		sectionName: "Blog"
	},
	{
		id: "newsletterHeading",
		label: "Newsletter heading",
		description: "The title text shown in the newsletter subscription section.",
		section: "blog",
		sectionName: "Blog"
	},
	{
		id: "newsletterDescription",
		label: "Newsletter description",
		description: "A brief description or call-to-action shown below the newsletter heading.",
		section: "blog",
		sectionName: "Blog"
	},
	// Docs (docs)
	{
		id: "showHydrationTierBadge",
		label: "Show hydration tier badge",
		description: "Show visual badges indicating the hydration tier (e.g. Auto-interactive, Presentational) on documentation pages.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "fallbackLabel",
		label: "Fallback group label",
		description: "The default group name used in the documentation sidebar for pages without a specified group.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "docOrder",
		label: "Explicit doc order",
		description: "A list of document slugs defining the precise order of articles in the sidebar.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "edit",
		label: "Edit button label",
		description: "Custom translation label for the documentation Edit button in the header.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "admin",
		label: "Admin button label",
		description: "Custom translation label for the documentation Admin button in the header.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "menu",
		label: "Mobile menu toggle label",
		description: "Custom translation label for the documentation mobile menu toggle.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "previous",
		label: "Previous doc label",
		description: "Custom translation label prefix for the previous-doc link.",
		section: "docs",
		sectionName: "Docs"
	},
	{
		id: "next",
		label: "Next doc label",
		description: "Custom translation label prefix for the next-doc link.",
		section: "docs",
		sectionName: "Docs"
	},
	// PMS (pms)
	{
		id: "subtasksExpandedByDefault",
		label: "Subtasks expanded by default",
		description: "Automatically expand all subtasks when loading a project board or task list.",
		section: "pms",
		sectionName: "PMS (Projects & Tasks)"
	},
	{
		id: "statusColors",
		label: "Task status colors",
		description: "Map specific colors to task status labels (To Do, In Progress, In Review, Done).",
		section: "pms",
		sectionName: "PMS (Projects & Tasks)"
	},
	{
		id: "priorityColors",
		label: "Task priority colors",
		description: "Map specific colors to task priority levels (Low, Medium, High, Urgent).",
		section: "pms",
		sectionName: "PMS (Projects & Tasks)"
	},
	{
		id: "projectStatusColors",
		label: "Project status colors",
		description: "Map specific colors to project status stages (Planning, Active, On Hold, Completed, Archived).",
		section: "pms",
		sectionName: "PMS (Projects & Tasks)"
	},
	// CMS Admin (cms-admin)
	{
		id: "backendType",
		label: "Backend type",
		description: "The git hosting service backend used by Sveltia CMS to manage files.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "backendRepo",
		label: "Repository (owner/repo)",
		description: "The GitHub, GitLab, or Gitea repository in 'owner/repository' format.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "backendBranch",
		label: "Branch",
		description: "The git branch the CMS reads from and commits updates to.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "backendBaseUrl",
		label: "Base URL (OAuth proxy)",
		description: "The authentication base URL, required when using self-hosted services like Gitea.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "i18nStructure",
		label: "i18n structure",
		description: "The directory and file organization pattern used for multi-language localization.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "locales",
		label: "Locales",
		description: "The list of locale codes supported on the site (e.g. en, zh, es, pt, fr, de).",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "defaultLocale",
		label: "Default locale",
		description: "The primary fallback locale code for untranslated content.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "omitDefaultLocale",
		label: "Omit default locale from file path",
		description: "If enabled, omits the locale subdirectory prefix from paths of the default language.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "mediaFolder",
		label: "Media folder",
		description: "The physical repository folder path where uploaded media assets are saved.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	},
	{
		id: "publicFolder",
		label: "Public folder",
		description: "The public asset base URL path where media is served in the browser.",
		section: "cms-admin",
		sectionName: "CMS Admin"
	}
];
