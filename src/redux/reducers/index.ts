import { USER_CHANGE } from '../constants';

const initialState = {
	user: null,
	userState: null,
};

const reducerGenerator = (act, initValue?, customLogic?) => {
	return (state = initValue || {}, action) => {
		switch (action.type) {
			case act:
				if (customLogic) customLogic(initialState, action);

				if (Array.isArray(initValue)) {
					return action.payload;
				} else if (typeof action.payload === 'string') {
					return action.payload;
				} else {
					return {
						...state,
						...action.payload,
					};
				}
			default:
				return state;
		}
	};
};

export const userReducer = reducerGenerator(USER_CHANGE, {}, (initialState, action) => {});
