import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Application} from "./application.model";
import {CreateApplicationDto} from "./dto/create-application.dto";


@Injectable()
export class ApplicationService {
	constructor(
		@InjectModel(Application) private applicationRepository: typeof Application
	) {}

	async createApplication(dto: CreateApplicationDto){
		await this.applicationRepository.create(dto)
		return HttpStatus.OK;
	}

	async getApplicationByUserId(userId: number){
		const application = await this.applicationRepository.findOne({where: {userId}})
		return application;
	}

	async getAllApplications(){
		const applications = await this.applicationRepository.findAll()
		return applications;
	}
}
