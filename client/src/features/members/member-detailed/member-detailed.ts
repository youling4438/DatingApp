import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Member } from '../../../types/member';
import { AsyncPipe } from '@angular/common';

@Component({
	selector: 'app-member-detailed',
	imports: [AsyncPipe],
	templateUrl: './member-detailed.html',
	styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit {
	private memberServie = inject(MemberService);
	private route = inject(ActivatedRoute);
	protected member$?: Observable<Member>;

	ngOnInit(): void {
		this.member$ = this.loadMember();
	}

	loadMember() {
		const id = this.route.snapshot.paramMap.get('id');
		if (!id) {
			return;
		}
		return this.memberServie.getMember(id);
	}
}
