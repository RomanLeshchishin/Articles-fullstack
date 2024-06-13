import styles from "./SideMenu.module.scss";
import {useState} from "react";
import {MenuLink} from "./MenuLink";

export type MenuLinkType = {
	link: string;
	text: string;
	border: boolean;
}

interface SideMenuProps {
	links: MenuLinkType[]
}

const SideMenu = ({ links } : SideMenuProps) => {
	const [activeFilterList, setActiveFilterList] = useState<boolean[]>([])
	return (
		<div className={styles.sideBlock}>
			<div className={styles.contentBlock}>
				{links.map((link, count) =>
					<MenuLink
						key={count}
						indexLink={count}
						link={link}
						links={links}
						active={activeFilterList[count]}
						setActiveList={setActiveFilterList}
					/>
				)}
			</div>
		</div>
	);
};

export default SideMenu;
