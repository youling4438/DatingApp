import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
	private accountService = inject(AccountService);

	init(): Observable<null> {
		const userJson = localStorage.getItem('user');
		if (userJson) {
			const user = JSON.parse(userJson);
			this.accountService.currentUser.set(user);
			return of(null);
		}
		return of(null);
	}
}
