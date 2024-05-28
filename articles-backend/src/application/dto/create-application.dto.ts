import {MaxLength} from "class-validator";

export class CreateApplicationDto{
	readonly userId: number;
	readonly name: string;
	readonly surname: string;

	@MaxLength(20)
	readonly nickname: string;

	readonly email: string;
	readonly date: string;

	@MaxLength(400)
	readonly about: string;
	readonly fileId: number;
}
