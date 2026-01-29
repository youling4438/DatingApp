import { Component, inject, output, signal } from '@angular/core';
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
	protected credentialsForm: FormGroup;
	protected profileForm: FormGroup;
	protected currentStep = signal(1);

	constructor() {
		this.credentialsForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			displayName: ['', Validators.required],
			password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
			confirmPassword: ['', [Validators.required, this.matchValues('password')]],
		});
		this.profileForm = this.fb.group({
			gender: ['', Validators.required],
			dateOfBirth: ['', Validators.required],
			city: ['', Validators.required],
			country: ['', Validators.required],
		});
		this.credentialsForm.controls['password'].valueChanges.subscribe(() => {
			this.credentialsForm.controls['confirmPassword'].updateValueAndValidity();
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

	nextStep() {
		if (this.credentialsForm.valid) {
			this.currentStep.update((step) => step + 1);
		}
	}

	prevStep() {
		this.currentStep.update((step) => step - 1);
	}

	register() {
		if(this.credentialsForm.valid && this.profileForm.valid) {
			const formData = {
				...this.credentialsForm.value,
				...this.profileForm.value,
			};
			console.log('registering user with data:', formData);
		}
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
