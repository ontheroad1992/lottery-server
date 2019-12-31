/*
 * @Description: redis 库
 * @Author: ontheroad1992
 * @Date: 2019-09-18 11:49:43
 * @LastEditors  : ontheroad1992
 * @LastEditTime : 2019-12-31 11:14:10
 */
'use strict';

import { createClient } from 'redis';
import { promisify } from 'util';

const client = createClient();

// 包装一个获取数据的同步请求 返回 promise
const hmgetAsync = promisify(client.hmget).bind(client);
const hmsetAsync = promisify(client.hmset).bind(client);

export const setLotteries = async (lotteries: number []): Promise<void> => {
  await hmsetAsync('lotteries', {
    un: JSON.stringify(lotteries),
  });
};

export const getLotteries = async (): Promise<number []> => {
  const lotteries = await hmgetAsync('lotteries', 'un');
  if (!lotteries[0]) { return []; }
  return JSON.parse(lotteries);
};

export const getLotteryCount = async () => {
  const count = await hmgetAsync('lotteries', 'count');
  return count[0];
};
