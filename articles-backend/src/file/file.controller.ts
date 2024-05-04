import {Controller, HttpCode, Post, Query, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {FileService} from "./file.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Express} from "express";

@Controller('file')
export class FileController {
	constructor(private readonly  fileService: FileService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('file'))
	async uploadFile(
		@UploadedFiles() files: Express.Multer.File[],
		@Query('folder') folder?: string
	) {
		const newFiles = await this.fileService.filterFiles(files)
		return this.fileService.saveFiles(newFiles, folder);
	}
}

