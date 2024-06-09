import styles from "./SideMenu.module.scss";
import {useState} from "react";
import {MenuLink} from "./MenuLink";

export type MenuLinkType = {
	link: string;
	text: string;
	border: boolean;
}

export const links: MenuLinkType[] = [
	{link: '', text: 'Все', border: false},
	{link: '', text: 'Разработка', border: false},
	{link: '', text: 'Дизайн', border: false},
	{link: '', text: 'Маркетинг', border: false},
	{link: '', text: 'Менеджмент', border: false},
	{link: '', text: 'Научпоп', border: false},
	{link: '/create-article', text: 'Создать статью', border: true},
	{link: '', text: 'Мои статьи', border: false}
]

const SideMenu = () => {
	const [activeFilterList, setActiveFilterList] = useState<boolean[]>([])
	return (
		<div className={styles.sideBlock}>
			<div className={styles.contentBlock}>
				{links.map((link, count) =>
					<MenuLink
						key={count}
						indexLink={count}
						link={link}
						active={activeFilterList[count]}
						setActiveList={setActiveFilterList}
					/>
				)}
			</div>
		</div>
	);
};

export default SideMenu;
