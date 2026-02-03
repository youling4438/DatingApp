import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Member, MemberParams } from '../../../types/member';
import { MemberCard } from '../member-card/member-card';
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';
import { FilterModal } from '../filter-modal/filter-modal';

@Component({
	selector: 'app-member-list',
	imports: [MemberCard, Paginator, FilterModal],
	templateUrl: './member-list.html',
	styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
	@ViewChild('filterModal') modal!: FilterModal;
	private memberService = inject(MemberService);
	protected paginatedMembers = signal<PaginatedResult<Member> | null>(null);
	protected memberParams = new MemberParams();

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.getMembers(this.memberParams).subscribe({
			next: (result) => {
				this.paginatedMembers.set(result);
			}
		});
	}

	protected onPageChange(event: { pageNumber: number; pageSize: number }): void {
		this.memberParams.pageNumber = event.pageNumber;
		this.memberParams.pageSize = event.pageSize;
		this.loadMembers();
	}

	openModal(): void {
		this.modal.open();
	}

	onClose(): void {
		// Handle modal close if needed
	}

	onFilterChanged(params: MemberParams): void {
		this.memberParams = params;
		this.loadMembers();
	}

	resetFilters(): void {
		this.memberParams = new MemberParams();
		this.loadMembers();
	}
}
