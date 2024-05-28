import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApplicationService} from "./application.service";
import {CreateApplicationDto} from "./dto/create-application.dto";


@Controller('application')
export class ApplicationController {
	constructor(private readonly applicationService: ApplicationService) {}

	@Post()
	create(@Body() applicationDto: CreateApplicationDto) {
		return this.applicationService.createApplication(applicationDto);
	}

	@Get()
	getAll() {
		return this.applicationService.getAllApplications();
	}

	@Get('/user/:userId') //проверка на роль админ
	getByUserId(@Param('userId') userId: number) {
		return this.applicationService.getApplicationByUserId(userId);
	}
}
