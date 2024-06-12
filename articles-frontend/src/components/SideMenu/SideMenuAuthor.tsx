import {useState} from "react";
import styles from "./SideMenu.module.scss";
import {MenuLinkType} from "./SideMenu.tsx";
import MenuLink from "./MenuLink.tsx";

export const authorLinks: MenuLinkType[] = [
	{link: '/', text: 'Все', border: false},
	{link: '/', text: 'Разработка', border: false},
	{link: '/', text: 'Дизайн', border: false},
	{link: '/', text: 'Маркетинг', border: false},
	{link: '/', text: 'Менеджмент', border: false},
	{link: '/', text: 'Научпоп', border: false},
	{link: '/create-article', text: 'Создать статью', border: true},
	{link: '/my-articles', text: 'Мои статьи', border: false}
]

const SideMenuAuthor = () => {
	const [activeFilterList, setActiveFilterList] = useState<boolean[]>([])
	return (
		<div className={styles.sideBlock}>
			<div className={styles.contentBlock}>
				{authorLinks.map((link, count) =>
					<MenuLink
						key={count}
						indexLink={count}
						link={link}
						links={authorLinks}
						active={activeFilterList[count]}
						setActiveList={setActiveFilterList}
					/>
				)}
			</div>
		</div>
	);
};

export default SideMenuAuthor;
