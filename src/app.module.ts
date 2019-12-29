import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';
import { ConfigModule } from './core/config/config.module';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, ConfigModule],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
