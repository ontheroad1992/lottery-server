import { HttpException, HttpStatus } from '@nestjs/common';
import { SelfError } from '../core/exception/self-error.interface';

export class LotteryException extends HttpException {
    constructor(
        { code = 30000, message = '抽奖程序错误' }: SelfError = {},
        status: number = HttpStatus.BAD_REQUEST,
    ) {
        super({ code, message }, status);
    }
}
