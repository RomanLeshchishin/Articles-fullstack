export interface IApplication {
	userId: number;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	date: string;
	about: string;
}

export interface IApplicationWithId extends IApplication{
	fileId: number;
}
