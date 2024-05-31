import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UploadFile} from "./file.model";
import {ApplicationModule} from "../application/application.module";
import {UsersModule} from "../users/users.module";

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [SequelizeModule.forFeature([UploadFile]), ApplicationModule, UsersModule]
})
export class FileModule {}
