import {Body, Controller, Post} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @Post('/registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }
}
