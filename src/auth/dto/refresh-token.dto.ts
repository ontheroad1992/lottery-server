import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiModelProperty({ description: 'uuid 必须是字符串类型，且长度为 36 位' })
    @Length(36, 36, { message: '长度为 36 位' })
    @IsString({ message: 'uuid 必须是字符串类型' })
    readonly uuid: string;

    @ApiModelProperty({ description: '必须为字符串类型' })
    @IsString({ message: 'token 必须为字符串类型' })
    readonly token: string;
}
