import {HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {MFile} from "./MFile.class";
import {v4 as uuidv4} from "uuid";
import sharp from "sharp";
import {InjectModel} from "@nestjs/sequelize";
import {UploadFile} from "./file.model";
import ExcelJS from 'exceljs';
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
		// const applications = await Promise.all(users.map(async (user) => {
		// 	const app = await this.applicationService.getApplicationByUserId(user.id)
		// 	return app.fileId;
		// }))
		// console.log(applications)
		const date = new Date().getTime()
		const workbook = new ExcelJS.Workbook();
		const worksheet = workbook.addWorksheet(`users`)
		worksheet.columns = [
			{ header: 'No', key: 'no'},
			{ header: 'Name', key: 'name'},
			{ header: 'Email', key: 'email'},
			{ header: 'Roles', key: 'roles'}
		]
		let data: IUserTable[] = users.map((user, count) => {
			return { no: count.toString(), name: user.name, email: user.email, roles: user.roles}
		})
		data.forEach((val,i,_) => {
			worksheet.addRow(val)
		})
		await workbook.xlsx.writeFile(`users-${date}.xlsx`)
		return HttpStatus.OK;
	}
}
