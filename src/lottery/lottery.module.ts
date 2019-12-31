import { Module } from '@nestjs/common';
import { LotteryController } from './lottery.controller';
import { LotteryService } from './lottery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lottery } from './lottery.entity';
import { UserService } from '../user/user.service';

@Module({
  controllers: [LotteryController],
  imports: [TypeOrmModule.forFeature([Lottery]), UserService],
  providers: [LotteryService],
  exports: [TypeOrmModule],
})
export class LotteryModule {}
