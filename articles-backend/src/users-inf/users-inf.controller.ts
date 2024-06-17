import {Body, Controller, Get, Param, Put, UseGuards} from '@nestjs/common';
import {UsersInfService} from "./users-inf.service";
import JwtAuthenticationGuard from "../auth/jwt-authentication.guard";
import {UpdateUserInfDto} from "./dto/update-user-inf.dto";

@Controller('users-inf')
export class UsersInfController {

	constructor(private usersInfService: UsersInfService) {}

	@Put()
	@UseGuards(JwtAuthenticationGuard)
	update(@Body() updateDto: UpdateUserInfDto) {
		return this.usersInfService.updateUserInf(updateDto.userId, updateDto)
	}

	@Get('/:userId')
	@UseGuards(JwtAuthenticationGuard)
	getByUserId(@Param('userId') userId: number) {
		return this.usersInfService.getUserInfByUserId(userId)
	}
}
