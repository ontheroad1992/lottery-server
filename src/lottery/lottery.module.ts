import { Module } from '@nestjs/common';
import { LotteryController } from './lottery.controller';
import { LotteryService } from './lottery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lottery } from './lottery.entity';

@Module({
  controllers: [LotteryController],
  imports: [TypeOrmModule.forFeature([Lottery])],
  providers: [LotteryService],
  exports: [TypeOrmModule],
})
export class LotteryModule {}
