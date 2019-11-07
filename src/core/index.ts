import { INestApplication, ValidationPipe } from '@nestjs/common';
import { logger } from './middleware/logger.middleware';
import { AllExceptionFiliter } from './exception/all-filiter.exception';
import { validationPip } from './pipe/validation.pipe';

export function core(app: INestApplication): void {
    /** 日志中间件 */
    app.use(logger);
    /** 异常过滤 */
    app.useGlobalFilters(new AllExceptionFiliter());
    /** 参数校验管道 */
    app.useGlobalPipes(validationPip);
}