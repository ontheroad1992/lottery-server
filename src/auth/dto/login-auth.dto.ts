import { IsString, Matches } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class LoginAuthDto {
    @ApiModelProperty({ description: '账户名必须是手机号且为字符串类型', pattern: '/^1[3456789]\d{9}$/', default: '18583273076' })
    @Matches(/^1[3456789]\d{9}$/, { message: '手机格式不正确' })
    @IsString({ message: '账户名必须是字符串类型' })
    readonly username: string;
}
