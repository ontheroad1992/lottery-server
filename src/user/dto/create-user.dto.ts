import { IsString, IsInt, Matches, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiModelProperty({ description: '账户名必须是手机号且为字符串类型', pattern: '/^1[3456789]\d{9}$/' })
    @Matches(/^1[3456789]\d{9}$/, { message: '手机格式不正确' })
    @IsString({ message: '账户名必须是字符串类型' })
    readonly username: string;

    @ApiModelProperty({ description: '姓名必须是中文', pattern: '/^[\u4e00-\u9fa5]\d{1,10}$/' })
    @Matches(/^[\u4e00-\u9fa5]{1,10}$/, { message: '姓名必须是中文' })
    @IsString({ message: '用户昵必须是字符串类型' })
    readonly nickname: string;
}
