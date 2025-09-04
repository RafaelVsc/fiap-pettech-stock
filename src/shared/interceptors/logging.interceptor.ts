import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { PrometheusService } from '../services/prometheus.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly prometheusService: PrometheusService) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    console.log(request.headers);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`After... ${Date.now() - now}ms`);
        const duration = Date.now() - now;
        console.log('ROUTE:', request.route.path);
        this.prometheusService.sendMetrics
          .labels(request.route.path)
          .observe(duration / 1000);
      }),
    );
  }
}
