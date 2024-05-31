import {
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	Res,
	StreamableFile,
	UploadedFiles,
	UseInterceptors
} from '@nestjs/common';
import {FileService} from "./file.service";
import {FilesInterceptor} from "@nestjs/platform-express";
import {Express, Response} from "express";
import { Readable } from 'stream';
import {getContentType} from "./file.util";

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Post()
	@HttpCode(200)
	@UseInterceptors(FilesInterceptor('file'))
	async uploadFile(
		@UploadedFiles() files: Express.Multer.File[]
	) {
		const newFiles = await this.fileService.filterFiles(files)
		return this.fileService.saveFiles(newFiles);
	}

	@Get('/:id')
	async getFileFromDatabaseById(@Param('id') id: number,  @Res({ passthrough: true }) response: Response) {
		const file = await this.fileService.getFileById(id)
		const stream = Readable.from(file.file)

		response.set({
			'Content-Disposition': `inline; filename="${file.filename}"`,
			'Content-Type': getContentType(file.filename)
		})

		return new StreamableFile(stream)
	}

	@Post('/create-excel')
	async createExcelFile() {
		const status = await this.fileService.createExcelFile()
		return status;
	}
}

