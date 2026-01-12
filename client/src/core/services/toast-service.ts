import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	constructor() {
		this.createToastContainer();
	}

	private createToastContainer() {
		let container = document.getElementById('toast-container');
		if (!container) {
			container = document.createElement('div');
			container.id = 'toast-container';
			container.className = 'toast toast-bottom toast-end';
			document.body.appendChild(container);
		}
		return container;
	}

	private cerateToastElement(message: string, alertClass: string, duration: number = 5000) {
		const toastContainer = document.getElementById('toast-container');
		if (!toastContainer) {
			return;
		}
		const toast = document.createElement('div');
		toast.classList.add('alert', alertClass, 'shadow-lg');
		toast.innerHTML = `
		<span>${message}</span>
		<button class="ml-4 btn btn-sm btn-ghost" onclick="this.parentElement.remove()">x</button>
		`;
		toast.querySelector('button')?.addEventListener('click', () => {
			if (toastContainer.contains(toast)) {
				toastContainer.removeChild(toast);
			}
		});
		toastContainer.append(toast);
		setTimeout(() => {
			if (toastContainer.contains(toast)) {
				toastContainer.removeChild(toast);
			}
		}, duration);
		return toast;
	}

	success(message: string, duration?: number) {
		this.cerateToastElement(message, 'alert-success', duration);
	}

	error(message: string, duration?: number) {
		this.cerateToastElement(message, 'alert-error', duration);
	}

	warning(message: string, duration?: number) {
		this.cerateToastElement(message, 'alert-warning', duration);
	}

	info(message: string, duration?: number) {
		this.cerateToastElement(message, 'alert-info', duration);
	}
}
