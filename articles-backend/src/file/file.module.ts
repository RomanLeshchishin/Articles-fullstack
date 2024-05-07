import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UploadFile} from "./file.model";

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [SequelizeModule.forFeature([UploadFile])]
})
export class FileModule {}
