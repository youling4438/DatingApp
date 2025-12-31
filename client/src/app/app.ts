import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit } from '@angular/core';
import { lastValueFrom, } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App implements OnInit {
	protected readonly title = signal('Dating App');
	private http = inject(HttpClient);
	protected members = signal<any>([]);

	async ngOnInit(): Promise<void> {
		this.members.set((await this.getMembers()) as any);
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
