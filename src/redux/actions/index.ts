import { USER_CHANGE } from '../constants/index';

export function changeUser(payload) {
	return {
		type: USER_CHANGE,
		payload: payload,
	};
}
