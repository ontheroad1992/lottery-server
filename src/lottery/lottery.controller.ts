import { Controller, Req, Post, HttpCode, Body, Get } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../core/decorator/roles.decorator';
import { LotteryService } from './lottery.service';
import { JoinLotteryDto } from './dto/join-lottery.dto';

@ApiUseTags('lottery')
@Controller('lottery')
export class LotteryController {
    constructor(private readonly lotteryServer: LotteryService) {}

    @Post('join')
    @HttpCode(201)
    @Roles('user')
    @ApiBearerAuth()
    @ApiOperation({ title: '参与活动' })
    join(@Req() req, @Body() joinLotteryDto: JoinLotteryDto) {
        const { id } = req.user;
        const { comments } = joinLotteryDto;
        return this.lotteryServer.join(id, comments);
    }

    @Post('paly')
    @Roles('user')
    @ApiBearerAuth()
    @ApiOperation({ title: '开始抽奖' })
    async paly(@Req() req) {
        const { id } = req.user;
        const data = await this.lotteryServer.paly(id);
        return data;
    }

    @Post('state')
    @Roles('user')
    async state(@Req() req) {
        const { id } = req.user;
        const data = await this.lotteryServer.findState(id);
        return data;
    }

    @Post('count')
    async count() {
        const data = await this.lotteryServer.findCount();
        return data;
    }
}
