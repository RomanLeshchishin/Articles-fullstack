import {MaxLength} from "class-validator";

export class CreateArticleDto{
	readonly userId: number;

	@MaxLength(20)
	readonly nickname: string;
	readonly date: string;

	@MaxLength(100)
	readonly topic: string;

	@MaxLength(300)
	readonly title: string;
	readonly text: string;
	readonly fileIds: number[];
}
