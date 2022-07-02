import { BehaviorSubject } from 'rxjs';
import { ISlideover } from '@components/Slideovers';

export class SlideoverService {
	slideover$;
	constructor() {
		this.slideover$ = new BehaviorSubject<ISlideover | null>(null);
	}

	openSlideover(slideopver: ISlideover) {
		this.slideover$.next(slideopver);
	}
}
