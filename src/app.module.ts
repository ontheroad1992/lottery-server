import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Connection } from 'typeorm';

@Module({
    imports: [TypeOrmModule.forRoot(), UserModule, AuthModule],
})
export class AppModule {
    constructor(private readonly connection: Connection) {}
}
