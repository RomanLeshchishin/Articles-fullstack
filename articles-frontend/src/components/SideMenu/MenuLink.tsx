import styles from "./SideMenu.module.scss";
import {Link} from "react-router-dom";
import {links, MenuLinkType} from "./SideMenu.tsx";
import {Dispatch, SetStateAction} from "react";

interface MenuLinkProps {
	indexLink: number,
  link: MenuLinkType,
	active: boolean,
	setActiveList: Dispatch<SetStateAction<boolean[]>>,
}

export const MenuLink = ({ indexLink, link, active, setActiveList } : MenuLinkProps) => {
	const selectOption = (index : number) => {
		const initialActiveList = new Array<boolean>(links.length).fill(false)
		const newActiveList = [
			...initialActiveList.slice(0, index),
			true,
			...initialActiveList.slice(index + 1)
		]
		setActiveList(newActiveList)
	}
	return (
		<div className={styles.menuLinkBlock}>
			{link.border && <hr style={{marginBottom: "20px"}}/>}
			<Link
				to={link.link}
				className={active ? styles.menuLinkActive : styles.menuLink}
				onClick={() => selectOption(indexLink)}
			>
				{link.text}
			</Link>
		</div>
	);
};

export default MenuLink
