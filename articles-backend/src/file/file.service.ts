import {Injectable, NotFoundException} from '@nestjs/common';
import {MFile} from "./MFile.class";
import {v4 as uuidv4} from "uuid";
import sharp from "sharp";
import {InjectModel} from "@nestjs/sequelize";
import {UploadFile} from "./file.model";

@Injectable()
export class FileService {
	constructor(@InjectModel(UploadFile) private UploadFileRepository: typeof UploadFile) {}

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
				const newName = uuidv4()
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
}
