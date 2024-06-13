export type MenuLinkType = {
	link: string;
	text: string;
	border: boolean;
}

export const baseLinks : MenuLinkType[] = [
	{link: '/', text: 'Все', border: false},
	{link: '/', text: 'Разработка', border: false},
	{link: '/', text: 'Дизайн', border: false},
	{link: '/', text: 'Маркетинг', border: false},
	{link: '/', text: 'Менеджмент', border: false},
	{link: '/', text: 'Научпоп', border: false}
]

export const authorLinks : MenuLinkType[] = [
	{link: '/create-article', text: 'Создать статью', border: true},
	{link: '/my-articles', text: 'Мои статьи', border: false}
]
