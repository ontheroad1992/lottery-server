import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import { ConfigService } from './core/config/config.service';
import { ConfigModule } from './core/config/config.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                // 数据库类型
                type: 'mysql',
                // 链接地址
                host: '127.0.0.1',
                // 端口
                port: 3306,
                // 用户名
                username: 'lottery',
                // 密码
                password: '123456',
                // 数据库名
                database: 'lottery',
                // 要加载并用于此连接的实体
                entities: ['dist/**/*.entity{.ts,.js}'],
                // 表名统一前缀
                entityPrefix: 'test_',
                // 自动创建数据库，注意会自动清除之前创建好的数据
                synchronize: true,
                // 开启日志
                logging: false,
            }),
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
