import styles from "./SideMenu.module.scss";
import {Link} from "react-router-dom";
import {MenuLinkType} from "./SideMenu.tsx";
import {Dispatch, SetStateAction} from "react";
import {useAppDispatch} from "../../hooks/redux.ts";
import {filterArticles} from "../../store/slices/articleSlice.ts";

interface MenuLinkProps {
	indexLink: number,
  link: MenuLinkType,
	links: MenuLinkType[],
	active: boolean,
	setActiveList: Dispatch<SetStateAction<boolean[]>>,
}

export const MenuLink = ({ indexLink, link, links, active, setActiveList } : MenuLinkProps) => {
	const dispatch = useAppDispatch()
	const selectOption = (index : number, link: MenuLinkType) => {
		const initialActiveList = new Array<boolean>(links.length).fill(false)
		const newActiveList = [
			...initialActiveList.slice(0, index),
			true,
			...initialActiveList.slice(index + 1)
		]
		setActiveList(newActiveList)
		dispatch(filterArticles(link.text))
	}
	return (
		<div className={styles.menuLinkBlock}>
			{link.border && <hr style={{marginBottom: "20px"}}/>}
			<Link
				to={link.link}
				className={active ? styles.menuLinkActive : styles.menuLink}
				onClick={() => selectOption(indexLink, link)}
			>
				{link.text}
			</Link>
		</div>
	);
};

export default MenuLink
