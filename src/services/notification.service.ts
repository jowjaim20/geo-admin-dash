import { BehaviorSubject } from 'rxjs';
import { INotification } from '@components/Notification';

export class NotificationService {
	floatingNotifications$: BehaviorSubject<INotification>;
	staticMainNotifications$: BehaviorSubject<INotification>;
	constructor() {
		this.floatingNotifications$ = new BehaviorSubject({} as INotification);
		this.staticMainNotifications$ = new BehaviorSubject({} as INotification);
	}

	openNotification(notification: INotification) {
		this.floatingNotifications$.next(notification);
	}

	openStaticMainNotification(notification: INotification) {
		this.staticMainNotifications$.next(notification);
	}
	closeNotification() {
		this.staticMainNotifications$.next({ closeNotification: true });
	}
}
