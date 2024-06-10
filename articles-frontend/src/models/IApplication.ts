export interface IApplication {
	userId: number;
	name: string;
	surname: string;
	nickname: string;
	email: string;
	date: string;
	about: string;
}

export interface IApplicationWithFileId extends IApplication{
	fileId: number;
}
