import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
	selector: 'app-nav',
	imports: [FormsModule, RouterLink, RouterLinkActive],
	templateUrl: './nav.html',
	styleUrl: './nav.css',
})
export class Nav {
	protected accountService = inject(AccountService);
	protected creds: any = {};
	private router = inject(Router);
	private toast = inject(ToastService);

	login() {
		this.accountService.login(this.creds).subscribe({
			next: (response) => {
				console.log(response);
				this.accountService.currentUser.set(response);
				this.creds = {};
				this.router.navigateByUrl('/members');
				this.toast.success('Login successful!');
			},
			error: (error) => {
				console.error(error.error);
				this.toast.error('Login failed. Please check your credentials.');
				// TODO: Add toast notification for login error
			},
		});
	}

	logout() {
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}
}
