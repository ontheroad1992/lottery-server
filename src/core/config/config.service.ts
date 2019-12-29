import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import Joi = require('@hapi/joi');

export type EnvConfig = Record<string, string>;

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(filPath = `${process.env.NODE_ENV || 'development'}.env`) {
        const config = dotenv.parse(fs.readFileSync(filPath));
        this.envConfig = this.validateInput(config);
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    /** 配置参数校验，以及数据类型转换 */
    private validateInput(envConfig: EnvConfig): EnvConfig {
        const envVarsSchema: Joi.ObjectSchema = Joi.object({
            NODE_ENV: Joi.string()
                .valid('development', 'production', 'test', 'provision')
                .default('development'),
            PORT: Joi.number().default(3000),
            API_AUTH_ENABLED: Joi.boolean().required(),
            SWAGGER_ENABLED: Joi.boolean().required(),
            TOKEN_SECRET: Joi.string().required(),
            TOKEN_ACCESS_EXPIRES_IN: Joi.string().required(),
            TOKEN_REFRESH_EXPIRES_IN: Joi.string().required(),
        });
        const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
        if (error) {
            throw new Error(`Config validation error: ${error.message}`);
        }
        return validatedEnvConfig;
    }

    /** 是否开启 swagger */
    get isSwaggerEnabled(): boolean {
        return Boolean(this.envConfig.SWAGGER_ENABLED);
    }

    /** 端口号 */
    get PORT(): number {
        return Number(this.envConfig.PORT);
    }

    get TOKEN_SECRET(): string {
        return String(this.envConfig.TOKEN_SECRET);
    }

    get TOKEN_ACCESS_EXPIRES_IN(): string {
        return String(this.envConfig.TOKEN_ACCESS_EXPIRES_IN);
    }

    get TOKEN_REFRESH_EXPIRES_IN(): string {
        return String(this.envConfig.TOKEN_REFRESH_EXPIRES_IN);
    }
}
