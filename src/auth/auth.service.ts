import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Login, TokenResult, UserAuthResult } from './interfaces/login.interfaces';
import { UserService } from '../user/user.service';
import { ConfigService } from '../core/config/config.service';
import { TokenException } from '../core/exception/token.exception';

@Injectable()
export class AuthService {
    constructor(
        private readonly userServer: UserService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}

    /**
     * 用户登录
     * @param username string
     * @param password string
     */
    async login(username: string, password: string): Promise<UserAuthResult> {
        const { uuid, roles } = await this.userServer.validateUser(username, password);
        const tokens = this.generateTokens(username, uuid, roles);
        return {
            username,
            uuid,
            ...tokens,
        };
    }

    /**
     * 更换令牌
     * @param uuid 用户id
     * @param token 刷新token
     */
    async refreshToken(uuid: string, token: string): Promise<TokenResult> {
        // 解析令 token
        let decode;
        try {
            decode = this.jwtService.verify(token);
        } catch (error) {
            if (error.name === 'JsonWebTokenError') {
                throw new TokenException({
                    code: 10011,
                    message: '令牌错误',
                });
            }
            if (error.name === 'TokenExpiredError') {
                throw new TokenException({
                    code: 10012,
                    message: '账户令牌过期',
                });
            }
        }

        if (decode.uuid !== uuid) {
            throw new TokenException({
                code: 10014,
                message: '账户令牌数据不匹配',
            });
        }
        // 检查 uuid 是否存在
        const { username, roles } = await this.userServer.findUserFromUUid(uuid);
        // 令牌组
        const tokens = this.generateTokens(username, uuid, roles);
        return tokens;
    }

    /**
     * 生成令牌组
     * @param username 用户名
     * @param uuid 用户uuid
     * @param roles 角色组
     */
    private generateTokens(username: string, uuid: string, roles: string[]): TokenResult {
        // 账户 token
        const accessToken = this.jwtService.sign({
            username, uuid, roles,
        }, {
            expiresIn: this.configService.TOKEN_ACCESS_EXPIRES_IN,
        });
        // 刷新 token
        const refreshToken = this.jwtService.sign({
            uuid,
        }, {
            expiresIn: this.configService.TOKEN_REFRESH_EXPIRES_IN,
        });
        return { accessToken, refreshToken };
    }
}
