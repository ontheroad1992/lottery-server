import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '../core/config/config.service';
import { ConfigModule } from '../core/config/config.module';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        JwtModule.register({
            secret: new ConfigService().TOKEN_SECRET,
        }),
        ConfigModule,
    ],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule {}
