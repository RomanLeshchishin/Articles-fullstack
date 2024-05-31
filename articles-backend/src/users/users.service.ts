import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User, private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue("USER")
        await user.$set('roles', [role.id])
        user.roles = [role]
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({include: Role})
        return users;
    }

		async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: Role})
        return user;
    }

	async updateUserRoles(id: string, value: string) {
		const user = await this.userRepository.findOne({ where: {id}, include: Role })
		const role = await this.roleService.getRoleByValue(value)
		const roleIds = user.roles.map((role) => role.id)
		await user.$set('roles', [...roleIds, role.id])
		user.roles = [...user.roles, role]
		user.save()
		return user.id;
	}

	async deleteUserRole(id: string) {
		const user = await this.userRepository.findOne({ where: {id}, include: Role })
		const role = await this.roleService.getRoleByValue("USER")
		await user.$set('roles', [role.id])
		user.roles = [role]
		return user.id;
	}
}
