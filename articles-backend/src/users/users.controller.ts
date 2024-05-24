import {Body, Controller, Get, Post, Put, UseGuards} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import JwtAuthenticationGuard from "../auth/jwt-authentication.guard";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @Get()// for admin
    getAll() {
        return this.userService.getAllUsers();
    }

	@Put()// roleGuard
	@UseGuards(JwtAuthenticationGuard)
	updateRoles(@Body() updateRoleDto: { id: string, value: string }) {
		return this.userService.updateUserRoles(updateRoleDto.id, updateRoleDto.value)
	}
}
