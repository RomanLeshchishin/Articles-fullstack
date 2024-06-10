export interface IArticle {
	userId: number;
	nickname: string;
	topic: string;
	tags: string[];
	title: string;
	text: string;
	fileIds: number[];
	checked: boolean;
}
