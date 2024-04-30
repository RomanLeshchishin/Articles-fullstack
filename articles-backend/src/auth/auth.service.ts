import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private jwtService: JwtService) {}

    async login(dto: LoginUserDto) {
        const user = await this.validateUser(dto)
        return this.generateToken(user)
    }

    async registration(dto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(dto.email)
        if(candidate) {
            throw new HttpException(`Пользователь с email ${dto.email} уже существует`, HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const user = await this.userService.createUser({...dto, password: hashPassword})
        return this.generateToken(user)
    }

    private async generateToken(user: User) {
        const payload = {id: user.id, email: user.email, roles: user.roles}
        return {
			token: this.jwtService.sign(payload),
			name: user.name
        }
    }

    private async validateUser(dto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(dto.email)
        if(!user) {
            throw new UnauthorizedException({message: 'Неправиный пароль или email'})
        }
        const passwordEquals = await bcrypt.compare(dto.password, user.password)
        if(passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Неправильный пароль или email'})
    }
}
