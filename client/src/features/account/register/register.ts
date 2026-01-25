import { Component, inject, output } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	ValidationErrors,
	ValidatorFn,
	Validators,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { RegisterCreds, User } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';
import { TextInput } from '../../../shared/text-input/text-input';

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, JsonPipe, TextInput],
	templateUrl: './register.html',
	styleUrl: './register.css',
})
export class Register {
	private accountService = inject(AccountService);
	private fb = inject(FormBuilder);
	cancelRegister = output<boolean>();
	protected creds = {} as RegisterCreds;
	protected registerForm: FormGroup;

	constructor() {
		this.registerForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			displayName: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
			confirmPassword: ['', [Validators.required, this.matchValues('password')]],
		});
		this.registerForm.controls['password'].valueChanges.subscribe(() => {
			this.registerForm.controls['confirmPassword'].updateValueAndValidity();
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
