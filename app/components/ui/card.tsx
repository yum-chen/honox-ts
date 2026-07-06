import CardIsland from "../../islands/card";
import {
	Body,
	CardBase,
	type CardBaseProps,
	Description,
	Footer,
	Header,
	Image,
	Root,
	Title,
} from "./card-primitive";

export interface CardProps extends CardBaseProps {
	interactive?: boolean;
}

export function Card(props: CardProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <CardIsland {...rest} />;
	}
	return <CardBase {...rest} />;
}

// Attach sub-components to the Card component
Object.assign(Card, {
	Root,
	Header,
	Body,
	Footer,
	Title,
	Description,
	Image,
});

export { Body, Description, Footer, Header, Root, Title, Image };
export default Card;

export const CardRoot = Root;
export const CardHeader = Header;
export const CardBody = Body;
export const CardFooter = Footer;
export const CardTitle = Title;
export const CardDescription = Description;
export const CardImage = Image;
