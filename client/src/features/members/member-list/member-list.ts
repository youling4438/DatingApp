import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from '../member-card/member-card';
import { PaginatedResult } from '../../../types/pagination';
import { Paginator } from '../../../shared/paginator/paginator';

@Component({
	selector: 'app-member-list',
	imports: [AsyncPipe, MemberCard, Paginator],
	templateUrl: './member-list.html',
	styleUrl: './member-list.css',
})
export class MemberList {
	private memberService = inject(MemberService);
	protected paginatedMembers$?: Observable<PaginatedResult<Member>>;
	pageNumber = 1;
	pageSize = 5;
	constructor() {
		this.loadMembers();
	}

	loadMembers(): void {
		this.paginatedMembers$ = this.memberService.getMembers(this.pageNumber, this.pageSize);
	}

	protected onPageChange(event: { pageNumber: number; pageSize: number }): void {
		this.pageNumber = event.pageNumber;
		this.pageSize = event.pageSize;
		this.loadMembers();
	}
}
