import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {LoginUserDto} from "./dto/login-user.dto";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import JwtAuthenticationGuard from "./jwt-authentication.guard";

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto)
    }

    @Post('/register')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto)
    }

	@Post('/test')
	@UseGuards(JwtAuthenticationGuard)
	test() {
		return 'ok'
	}
}
