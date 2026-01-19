import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
	const busyService = inject(BusyService);

	if (req.method === 'GET') {
		const cachedResponse = cache.get(req.url);
		if (cachedResponse) {
			return of(cachedResponse);
		}
	}

	busyService.busy();
	return next(req).pipe(
		delay(500),
		tap(res => {
			cache.set(req.url, res);
		}),
		finalize(() => {
			busyService.idle();
		}),
	);
};
