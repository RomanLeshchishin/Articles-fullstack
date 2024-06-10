import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Article} from "./article.model";
import {CreateArticleDto} from "./dto/create-article.dto";

@Injectable()
export class ArticleService {
	constructor(
		@InjectModel(Article) private articleRepository: typeof Article
	) {}

	async createArticle(dto: CreateArticleDto){
		const article = await this.articleRepository.create(dto)
		return HttpStatus.OK;
	}

	async getArticleById(id: number){
		const article = await this.articleRepository.findOne({where: {id}})
		return article;
	}

	async getArticlesByUserId(userId: number) {
		const articles = await this.articleRepository.findAll({where: {userId}})
		return articles;
	}

	async getAllArticles() {
		const articles = await this.articleRepository.findAll()
		return articles;
	}

	async deleteArticleById(id: number) {
		const article = await this.articleRepository.findOne({where: {id}})
		await this.articleRepository.destroy({where: {id}})
		return article;
	}
}
