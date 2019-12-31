import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lottery } from './lottery.entity';
import { Repository, Not } from 'typeorm';
import { LotteryException } from './lottery.exception';
import { LotteryResult } from './interfaces/lottery-result.interface';
import { setLotteries, getLotteries } from '../utils/redis-client';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class LotteryService {
    constructor(
        @InjectRepository(Lottery)
        private readonly lotteryRepository: Repository<Lottery>,
    ) {}

    public async paly(userId: number) {
        const lottery = await this.findLotteryFormUserId(userId);
        if (!lottery) {
            throw new LotteryException({
                code: 30002,
                message: '未报名此次活动',
            });
        }
        if (lottery.sideUserId) {
            throw new LotteryException({
                code: 30003,
                message: '您已经获得了礼物',
            });
        }
        let unLotteries = await getLotteries();
        const sideUserId = await this.lottering(userId, unLotteries);
        // 更新抽奖对象
        lottery.sideUserId = sideUserId;
        await this.lotteryRepository.update({ userId }, lottery);
        unLotteries = unLotteries.filter(id => {
            return id !== sideUserId;
        });
        await setLotteries(unLotteries);

    }

    private async lottering(userId: number, unLotteries): Promise<number> {
        let activeLottery: number;
        const loop = async () => {
            if (unLotteries.length <= 2) {
                // tslint:disable-next-line:variable-name
                const unLotteries_ = await this.lotteryRepository.find({
                    where: {
                        sideUserId: null,
                    },
                });
                unLotteries.map(id => {
                    unLotteries_.map(item => {
                        if (item.userId === id && userId !== id) {
                            activeLottery = id;
                        }
                    });
                });
                if (!activeLottery) {
                    unLotteries.map(id => {
                        if (id !== userId) { activeLottery = id; }
                    });
                }
            } else {
                activeLottery = this.getRandomLottery(unLotteries);
                if (activeLottery === userId) {
                    loop();
                }
                return null;
            }
        };
        await loop();
        return activeLottery;
    }

    private getRandomLottery(unLotteries: number []): number {
        const min = 0;
        const max = Math.floor(unLotteries.length) - 1;
        const activeIndex = Math.floor(Math.random() * (max - min + 1)) + min;
        const activeLottery = unLotteries[activeIndex];
        return activeLottery;
    }

    /**
     * 参加活动
     * @param userId 用户id
     * @param comments 留言
     */
    public async join(userId: number, comments: string): Promise<void> {
        const lottery = await this.findLotteryFormUserId(userId);
        if (lottery) {
            throw new LotteryException({
                code: 30001,
                message: '您已经参与了活动',
            });
        }
        // 存储至数据库中
        const lotteries = new Lottery();
        lotteries.userId = userId;
        lotteries.comments = comments;
        await this.lotteryRepository.save(lotteries);
        // 存储至 redis 中
        let lotteriesCache: number[] = await getLotteries();
        if (!lotteriesCache || lotteriesCache.length === 0) {
            lotteriesCache = [userId];
        } else {
            lotteriesCache = [...lotteriesCache, userId];
        }
        await setLotteries(lotteriesCache);
    }

    private async findLotteryFormUserId(userId: number): Promise<Lottery> {
        const lottery = await this.lotteryRepository.findOne({
            where: { userId },
        });
        return lottery;
    }
}
