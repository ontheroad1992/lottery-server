import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lottery } from './lottery.entity';
import { Repository } from 'typeorm';
import { LotteryException } from './lottery.exception';

@Injectable()
export class LotteryService {
    constructor(
        @InjectRepository(Lottery)
        private readonly lotteryRepository: Repository<Lottery>,
    ) {}

    /**
     * 参加活动
     * @param userId 用户id
     * @param comments 留言
     */
    public async join(userId: number, comments: string) {
        const lottery = await this.findLotteryFormUserId(userId);
        if (lottery) {
            throw new LotteryException({
                code: 30001,
                message: '您已经参与了活动',
            });
        }
        const lotteries = new Lottery();
        lotteries.userId = userId;
        lotteries.comments = comments;
        await this.lotteryRepository.save(lotteries);
    }

    private async findLotteryFormUserId(userId: number): Promise<Lottery> {
        const lottery = await this.lotteryRepository.findOne({
            where: { userId },
        });
        return lottery;
    }
}
