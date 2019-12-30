import { IsString, Length } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class JoinLotteryDto {
    @ApiModelProperty({ description: '长度为 4 - 20 之间' })
    @Length(4, 20, { message: '长度为 4 - 20 之间' })
    @IsString({ message: '必须是字符串类型' })
    readonly comments: string;
}
