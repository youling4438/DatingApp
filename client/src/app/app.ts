import { Component, inject, signal, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { User } from '../types/user';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.css',
	imports: [Nav, RouterOutlet,],
})
export class App implements OnInit {
	protected readonly title = signal('Dating App');
	private http = inject(HttpClient);
	protected readonly router = inject(Router);
	private accountService = inject(AccountService);
	protected members = signal<User[]>([]);

	async ngOnInit(): Promise<void> {
		this.setCurrentUser();
		this.members.set((await this.getMembers()));
	}

	setCurrentUser() {
		const userJson = localStorage.getItem('user');
		if (userJson) {
			const user = JSON.parse(userJson);
			this.accountService.currentUser.set(user);
		}
	}

	async getMembers() {
		try {
			return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
		} catch (error) {
			console.error(error);
			throw new Error('Get HTTP members failed');
		}
	}
}
