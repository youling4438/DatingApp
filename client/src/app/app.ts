import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.css',
	imports: [Nav, Home],
})
export class App implements OnInit {
	protected readonly title = signal('Dating App');
	private http = inject(HttpClient);
	private accountService = inject(AccountService);
	protected members = signal<any>([]);

	async ngOnInit(): Promise<void> {
		this.setCurrentUser();
		this.members.set((await this.getMembers()) as any);
	}

	setCurrentUser() {
		const userJson = localStorage.getItem('user');
		if (userJson) {
			const user = JSON.parse(userJson);
			this.accountService.currentUser.set(user);
		}
	}

	async getMembers(): Promise<any> {
		try {
			return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
		} catch (error) {
			console.error(error);
			throw new Error('Get HTTP members failed');
		}
	}
}
