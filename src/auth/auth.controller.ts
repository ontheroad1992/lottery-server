import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserAuthResult } from './interfaces/login.interfaces';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authServer: AuthService) {}

    @Post('login')
    @ApiOperation({ title: '用户登录' })
    @ApiResponse({
        status: 200,
        description: '登录的账户令牌和刷新令牌，以及一些其他参数',
    })
    async login(@Body() loginAuthDto: LoginAuthDto): Promise<UserAuthResult> {
        const { username, password } = loginAuthDto;
        const data = await this.authServer.login(username, password);
        return data;
    }

    @Post('refresh')
    @ApiOperation({ title: '刷新/更换令牌' })
    @ApiResponse({
        status: 201,
        description: '令牌的校验结果',
    })
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        const { uuid, token } = refreshTokenDto;
        const data = await this.authServer.refreshToken(uuid, token);
        return data;
    }
}
