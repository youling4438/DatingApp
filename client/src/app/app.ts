import { Component, inject, } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from '../layout/nav/nav';

@Component({
	selector: 'app-root',
	templateUrl: './app.html',
	styleUrl: './app.css',
	imports: [Nav, RouterOutlet,],
})
export class App {
	protected readonly router = inject(Router);
}
