import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from "path";

@Module({
  controllers: [FileController],
  providers: [FileService],
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', '..', '/static'),
			serveRoot: '/static'
		})
	]
})
export class FileModule {}
