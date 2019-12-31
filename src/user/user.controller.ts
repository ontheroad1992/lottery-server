import { Controller, Post, Body, HttpCode, Req, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CheckUserDto } from './dto/check-user.dto';
import { Roles } from '../core/decorator/roles.decorator';

@ApiUseTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userServer: UserService) {}

    @Post('register')
    @HttpCode(201)
    @ApiOperation({ title: '用户注册' })
    @ApiResponse({
        status: 201,
        description: '',
    })
    create(@Body() createUserDto: CreateUserDto) {
        const { username, nickname } = createUserDto;
        return this.userServer.create(username, nickname);
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('find')
    @Roles('user')
    @ApiBearerAuth()
    @ApiOperation({ title: '获取用户信息' })
    @ApiResponse({
        status: 201,
        description: '',
    })
    find(@Req() req) {
        const { uuid } = req.user;
        return this.userServer.findUserFromUUid(uuid);
    }

    @Post('check')
    @HttpCode(201)
    @ApiOperation({ title: '检查用户是否被注册过' })
    @ApiResponse({
        status: 201,
        description: '',
    })
    check(@Body() checkUserDto: CheckUserDto) {
        const { username, nickname } = checkUserDto;
        return this.userServer.checkUserFromUsername(username, nickname);
    }
}
