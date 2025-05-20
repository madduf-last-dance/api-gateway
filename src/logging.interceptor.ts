import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import * as os from 'os';
import * as si from 'systeminformation';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  constructor(
    @InjectMetric('http_request_total')
    private readonly httpCounter: Counter<string>,
    @InjectMetric('unique_visitors')
    private readonly uniqueVisitorsCounter: Counter<string>,
    @InjectMetric('node_network_receive_bytes_total')
    private readonly totalTrafficCounter: Counter<string>,
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() === 'http') {
      return this.logHttpCall(context, next);
    }
  }

  private logHttpCall(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const userAgent = request.get('user-agent') || '';
    const { ip, method, path: url } = request;
    const correlationKey = uuidv4();
    const userId = request.user?.userId;

    this.logger.log(
      `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${
        context.getClass().name
      } ${context.getHandler().name}`,
    );

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();

        const { statusCode } = response;
        const contentLength = response.get('content-length');

        this.logger.log(
          `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${
            Date.now() - now
          }ms`,
        );
        this.uniqueVisitorsCounter.labels(ip.toString(), new Date().toISOString().split('T')[0], userAgent.toString()).inc(1);
        this.httpCounter.labels(url, method, statusCode.toString()).inc(1);
        this.test().then(
          bytes => {
            this.totalTrafficCounter.labels("").inc((bytes / (1024 * 1024 * 1024)));
          } 
        );
      }),
    );
  }

  async test() {
    const networkStats = await si.networkStats('eth0');
    return networkStats[0].rx_bytes;
  }
}
