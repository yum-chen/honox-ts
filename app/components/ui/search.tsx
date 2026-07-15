import SearchIsland, { type SearchProps } from "../../islands/search";

export function Search(props: SearchProps) {
	return <SearchIsland {...props} />;
}

export type { SearchProps };
