import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserInf} from "./users-inf.model";
import {UpdateUserInfDto} from "./dto/update-user-inf.dto";

@Injectable()
export class UsersInfService {
	constructor(@InjectModel(UserInf) private userInfRepository: typeof UserInf){}

	async updateUserInf(userId: number, dto: UpdateUserInfDto) {
		await this.userInfRepository.update(dto, {where: {userId}})
		const userInf = this.userInfRepository.findOne({where: {userId}})
		return userInf;
	}

	async getUserInfByUserId(userId: number) {
		const userInf = this.userInfRepository.findOne({where: {userId}})
		return userInf;
	}
}
