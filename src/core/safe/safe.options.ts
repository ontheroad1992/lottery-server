import { INestApplication } from '@nestjs/common';
import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';

const XSRF_TOKEN: string = 'XSRF-TOKEN';

export function safeOptions(app: INestApplication) {
    /** HTTP 头部安全设置 */
    app.use(helmet());
    /** 开启跨域 */
    app.enableCors();
    /** CSRF 防护 */
    // app.use((req: Request, res: Response, next: NextFunction) => {
    //     res.cookie(XSRF_TOKEN, req.csrfToken());
    //     next();
    // });
    // app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(cookieParser());
    // app.use(csurf({
    //     cookie: true,
    //     value: (req) => {
    //         return req.cookies[XSRF_TOKEN];
    //     },
    // }));
    /** 限速 */
    app.use(
        rateLimit({
            windowMs: 1 * 60 * 1000, // 15 minutes
            max: 60, // limit each IP to 100 requests per windowMs
        }),
    );
}
