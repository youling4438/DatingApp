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
	private updateMessage = new MemberParams();

	constructor(){
		const filters = localStorage.getItem('filters');
		if (filters) {
			this.memberParams = JSON.parse(filters);
			this.updateMessage = JSON.parse(filters);
		}
	}

	ngOnInit(): void {
		this.loadMembers();
	}

	loadMembers(): void {
		this.memberService.getMembers(this.memberParams).subscribe({
			next: (result) => {
				this.paginatedMembers.set(result);
			},
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
		this.updateMessage = { ...params };
		this.memberParams = { ...params };
		this.loadMembers();
	}

	resetFilters(): void {
		this.updateMessage = new MemberParams();
		this.memberParams = new MemberParams();
		localStorage.setItem('filters', JSON.stringify(this.memberParams));
		this.loadMembers();
	}

	get displayMesage(): string {
		const defautlParams = new MemberParams();
		const filters: string[] = [];
		if (this.updateMessage.gender) {
			filters.push(`${this.updateMessage.gender}s`);
		} else {
			filters.push('Males, Females');
		}

		if (
			this.updateMessage.minAge !== defautlParams.minAge ||
			this.updateMessage.maxAge !== defautlParams.maxAge
		) {
			filters.push(`ages ${this.updateMessage.minAge} - ${this.updateMessage.maxAge}`);
		}
		filters.push(
			`${this.updateMessage.orderBy === 'created' ? 'Newest members' : 'Recently active'}`,
		);

		return `Selected: ${filters.join('  | ')}`;
	}
}
