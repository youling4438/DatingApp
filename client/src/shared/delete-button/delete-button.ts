import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {
	disabled = input<boolean>(false);
	clickEvent = output<Event>();

	onClick(event: Event) {
		if (!this.disabled()) {
			this.clickEvent.emit(event);
		}
	}

}
