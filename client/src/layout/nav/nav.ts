import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';
import { themes } from '../theme';

@Component({
	selector: 'app-nav',
	imports: [FormsModule, RouterLink, RouterLinkActive],
	templateUrl: './nav.html',
	styleUrl: './nav.css',
})
export class Nav implements OnInit {
	protected accountService = inject(AccountService);
	protected creds: any = {};
	private router = inject(Router);
	private toast = inject(ToastService);
	protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
	protected themes = themes;

	ngOnInit(): void {
		document.documentElement.setAttribute('data-theme', this.selectedTheme());
	}

	handleSelectTheme(theme: string) {
		this.selectedTheme.set(theme);
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		const ele = document.activeElement as HTMLDivElement;
		if (ele) {
			ele.blur();
		}
	}

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
			},
		});
	}

	logout() {
		this.accountService.logout();
		this.router.navigateByUrl('/');
	}
}
