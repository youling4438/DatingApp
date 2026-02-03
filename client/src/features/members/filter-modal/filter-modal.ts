import { Component, ElementRef, output, ViewChild } from '@angular/core';
import { MemberParams } from '../../../types/member';

@Component({
  selector: 'app-filter-modal',
  imports: [],
  templateUrl: './filter-modal.html',
  styleUrl: './filter-modal.css',
})
export class FilterModal {
	@ViewChild('filterModal') modalRef!: ElementRef<HTMLDialogElement>;
	closeModal = output();
	submitData = output<MemberParams>();

	open() {
		this.modalRef.nativeElement.showModal();
	}

	close() {
		this.modalRef.nativeElement.close();
		this.closeModal.emit();
	}

	submit(params?: MemberParams) {
		this.submitData.emit(new MemberParams());
		this.close();
	}
}
