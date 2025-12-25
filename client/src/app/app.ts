import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, OnInit, } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Dating App');
  private http = inject(HttpClient);

  ngOnInit() : void{
	this.http.get('https://localhost:5001/api/members').subscribe({
		next: response => {
			console.log(response);
		},
		error: error => {
			console.log(error);
		},
		complete: () => {
			console.log('Request completed');
		},
	});
  }
}
