import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {MFile} from "./MFile.class";
import {v4 as uuidv4} from "uuid";
import sharp from "sharp";
import {join} from "path";
import { access, mkdir, writeFile } from "fs/promises";
import {FileResponse} from "./file.interface";

@Injectable()
export class FileService {
	async saveFiles(newFiles: MFile[], folder = 'default') {
		const uploadFolder = join(__dirname, '..', '..', folder)

		try {
			await access(uploadFolder);
		} catch (e) {
			await mkdir(uploadFolder, { recursive: true });
		}

		const res: FileResponse[] = await Promise.all(newFiles.map(async file => {
			try {
				console.log(file.buffer)
				await writeFile(join(uploadFolder, file.originalname), file.buffer)
			} catch (e) {
				throw new InternalServerErrorException('Ошибка при записи файлов');
			}
			return {
				url: `/static/${folder}/${file.originalname}`,
				name: file.originalname
			};
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
				console.log(mimetype)
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
