import {
	ApplicationConfig,
	inject,
	provideAppInitializer,
	provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { InitService } from '../core/services/init-service';
import { lastValueFrom } from 'rxjs';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideHttpClient(),
		provideRouter(routes, withViewTransitions()),
		provideAppInitializer(async () => {
			const initService = inject<any>(InitService);
			return new Promise<void>(resolve => {
				setTimeout(() => {
					try {
						return lastValueFrom(initService.init());
					} finally {
						const splash = document.getElementById('initial-splash');
						if (splash) {
							splash.remove();
						}
						resolve();
					}
				}, 500);
			});
		}),
	],
};
