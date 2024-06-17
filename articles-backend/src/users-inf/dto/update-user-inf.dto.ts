export class UpdateUserInfDto{
	readonly userId: number;
	readonly surname?: string;
	readonly age?: number;
	readonly avatar?: number;
	readonly nickname?: string;
	readonly interests?: string[];
}
