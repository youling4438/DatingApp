import { Component, inject, OnInit, output } from '@angular/core';
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { JsonPipe } from '@angular/common';

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, JsonPipe],
	templateUrl: './register.html',
	styleUrl: './register.css',
})
export class Register implements OnInit {
	private accountService = inject(AccountService);
	cancelRegister = output<boolean>();
	protected creds = {} as RegisterCreds;
	protected registerForm: FormGroup = new FormGroup({});

	ngOnInit(): void {
		this.initializeForm();
		this.registerForm.controls['password'].valueChanges.subscribe(() => {
			this.registerForm.controls['confirmPassword'].updateValueAndValidity();
		});
	}

	initializeForm() {
		this.registerForm = new FormGroup({
			email: new FormControl('thomas.zhang@test.com', [
				Validators.required,
				Validators.email,
			]),
			displayName: new FormControl('', Validators.required),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(8),
			]),
			confirmPassword: new FormControl('', [
				Validators.required,
				this.matchValues('password'),
			]),
		});
	}

	matchValues(controlName: string): ValidatorFn {
		return (control: AbstractControl): ValidationErrors | null => {
			const parent = control.parent;
			if (!parent) {
				return null;
			}
			const matchValue = parent.get(controlName)?.value;
			if (control.value === matchValue) {
				return null;
			} else {
				return { passwordMismatch: true };
			}
		};
	}

	register() {
		console.log(this.registerForm.value);
		// this.accountService.register(this.creds).subscribe({
		// 	next: (user: User) => {
		// 		console.log('registered user:', user);
		// 		this.cancel();
		// 	},
		// 	error: (error) => {
		// 		console.error('registration error:', error);
		// 	},
		// });
	}

	cancel() {
		console.log('cancelled');
		this.cancelRegister.emit(false);
	}
}
