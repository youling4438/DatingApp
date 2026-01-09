import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
	private accountService = inject(AccountService);
	cancelRegister = output<boolean>();
	protected creds = { } as RegisterCreds;

	register() {
		console.log(this.creds);
		this.accountService.register(this.creds).subscribe({
			next: (user: User) => {
				console.log('registered user:', user);
				this.cancel();
			},
			error: (error) => {
				console.error('registration error:', error);
			}
		});
	}

	cancel() {
		console.log('cancelled');
		this.cancelRegister.emit(false);
	}
}
