import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Article} from "./article.model";

@Module({
	controllers: [ArticleController],
	providers: [ArticleService],
	imports: [SequelizeModule.forFeature([Article])]
})
export class ArticleModule {}
