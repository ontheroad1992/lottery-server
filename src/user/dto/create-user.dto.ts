import { IsString, IsInt, Matches, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({ description: '账户名必须是手机号且为字符串类型', pattern: '/^1[3456789]\d{9}$/' })
    @Matches(/^1[3456789]\d{9}$/, { message: '手机格式不正确' })
    @IsString({ message: '账户名必须是字符串类型' })
    readonly username: string;

    @ApiModelProperty({ description: '长度为 2 - 18 位' })
    @IsString({ message: '昵称/姓名，格式不对' })
    @Length(2, 18, { message: '长度为 2 - 18 位' })
    readonly nickname: string;
}
