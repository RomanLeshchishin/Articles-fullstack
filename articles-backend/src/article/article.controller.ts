import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {ArticleService} from "./article.service";
import {CreateArticleDto} from "./dto/create-article.dto";

@Controller('article')
export class ArticleController {
	constructor(private readonly articleService: ArticleService) {}

	@Post()
	create(@Body() articleDto: CreateArticleDto) {
		return this.articleService.createArticle(articleDto);
	}

	@Get()
	getAll() {
		return this.articleService.getAllArticles()
	}

	@Get('/:id')
	getById(@Param('id') id: number) {
		return this.articleService.getArticleById(id)
	}

	@Get('/user/:userId')
	getByUserId(@Param('userId') userId: number) {
		return this.articleService.getArticlesByUserId(userId)
	}

	@Delete('/:id')
	deleteById(@Param('id') id: number) {
		return this.articleService.deleteArticleById(id)
	}
}
