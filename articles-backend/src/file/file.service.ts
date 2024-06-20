import {HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {MFile} from "./MFile.class";
import {utils, write} from 'xlsx';
import sharp from "sharp";
import {InjectModel} from "@nestjs/sequelize";
import {UploadFile} from "./file.model";
import {UsersService} from "../users/users.service";
import {IUserTable} from "./file.interface";
import {ApplicationService} from "../application/application.service";

@Injectable()
export class FileService {
	constructor(
		@InjectModel(UploadFile) private UploadFileRepository: typeof UploadFile,
		private usersService: UsersService,
		private applicationService: ApplicationService
	) {}

	async saveFileToDatabase(fileBuffer: Buffer, filename: string) {
		const newFile = await this.UploadFileRepository.create({
			filename,
			file: fileBuffer
		})
		return {id: newFile.id, filename: newFile.filename};
	}

	async getFileById(id: number) {
		const file = await this.UploadFileRepository.findOne({where: {id}})
		if (!file) {
			throw new NotFoundException();
		}
		return file;
	}

	async saveFiles(newFiles: MFile[]) {
		const res = await Promise.all(newFiles.map(async file => {
			const newFile = await this.saveFileToDatabase(file.buffer, file.originalname)
			return newFile;
		}))
		return res;
	}

	private async convertToWebP(file: Buffer) {
		return sharp(file).webp().toBuffer();
	}

	async filterFiles(files: MFile[]) {
		const newFiles = await Promise.all(
			files.map( async file => {
				const mimetype = file.mimetype
				const currentFileType = mimetype.split('/')[1]
				const newName = file.originalname.split('.')[0]
				const type = file.originalname.split('.')[1]

				if(mimetype.includes('image')) {
					if(currentFileType !== 'svg+xml') {
						const buffer = await this.convertToWebP(file.buffer);
						return new MFile({
							buffer,
							originalname: `${newName}.webp`,
							mimetype
						});
					}
					return new MFile({
						buffer: file.buffer,
						originalname: `${newName}.svg`,
						mimetype
					});
				}
					return new MFile({
						buffer: file.buffer,
						originalname: `${newName}.${type}`,
						mimetype
					});
			}
			)
		)
		return newFiles;
	}

	async createExcelFile() {
		const users = await this.usersService.getAllUsers()
		const columns = ['No', 'Name', 'Email', 'Roles']
		let data = []
		data.push(columns)
		users.forEach((user, count) => {
			data.push([count.toString(), user.name, user.email, user.roles.map((role) => role.value).join('|')])
		})
		const wb = utils.book_new()
		const ws = utils.aoa_to_sheet(data)
		utils.book_append_sheet(wb, ws, 'users')
		const buf = write(wb, {type: "buffer", bookType: "xlsx"})
		return buf;
	}
}
