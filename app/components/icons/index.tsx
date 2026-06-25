import { createIcon } from "./create-icon";

export type { IconProps } from "./create-icon";
export { createIcon } from "./create-icon";

// Framework-agnostic SVG icons mirroring `lucide-react`'s drawings, so they can
// be used anywhere a lucide icon was previously used — without React.

export const ChevronDownIcon = createIcon(<path d="m6 9 6 6 6-6" />, "ChevronDownIcon");

export const ChevronRightIcon = createIcon(
	<path d="m9 18 6-6-6-6" />,
	"ChevronRightIcon",
);

export const ChevronUpIcon = createIcon(
	<path d="m18 15-6-6-6 6" />,
	"ChevronUpIcon",
);

export const XIcon = createIcon(
	<>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</>,
	"XIcon",
);

export const CheckIcon = createIcon(<path d="M20 6 9 17l-5-5" />, "CheckIcon");

export const MenuIcon = createIcon(
	<>
		<line x1="4" x2="20" y1="12" y2="12" />
		<line x1="4" x2="20" y1="6" y2="6" />
		<line x1="4" x2="20" y1="18" y2="18" />
	</>,
	"MenuIcon",
);

export const PlusIcon = createIcon(
	<>
		<path d="M5 12h14" />
		<path d="M12 5v14" />
	</>,
	"PlusIcon",
);

export const SearchIcon = createIcon(
	<>
		<circle cx="11" cy="11" r="8" />
		<path d="m21 21-4.3-4.3" />
	</>,
	"SearchIcon",
);

export const SettingsIcon = createIcon(
	<>
		<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
		<circle cx="12" cy="12" r="3" />
	</>,
	"SettingsIcon",
);

export const UserIcon = createIcon(
	<>
		<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
		<circle cx="12" cy="7" r="4" />
	</>,
	"UserIcon",
);

export const LogOutIcon = createIcon(
	<>
		<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
		<polyline points="16 17 21 12 16 7" />
		<line x1="21" x2="9" y1="12" y2="12" />
	</>,
	"LogOutIcon",
);

export const TrashIcon = createIcon(
	<>
		<path d="M3 6h18" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		<line x1="10" x2="10" y1="11" y2="17" />
		<line x1="14" x2="14" y1="11" y2="17" />
	</>,
	"TrashIcon",
);

export const CopyIcon = createIcon(
	<>
		<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
		<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
	</>,
	"CopyIcon",
);

export const HeartIcon = createIcon(
	<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
	"HeartIcon",
);

export const InfoIcon = createIcon(
	<>
		<circle cx="12" cy="12" r="10" />
		<path d="M12 16v-4" />
		<path d="M12 8h.01" />
	</>,
	"InfoIcon",
);

export const SunIcon = createIcon(
	<>
		<circle cx="12" cy="12" r="4" />
		<path d="M12 2v2" />
		<path d="M12 20v2" />
		<path d="m4.93 4.93 1.41 1.41" />
		<path d="m17.66 17.66 1.41 1.41" />
		<path d="M2 12h2" />
		<path d="M20 12h2" />
		<path d="m6.34 17.66-1.41 1.41" />
		<path d="m19.07 4.93-1.41 1.41" />
	</>,
	"SunIcon",
);

export const MoonIcon = createIcon(
	<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />,
	"MoonIcon",
);
