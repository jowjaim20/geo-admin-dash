import { createStore, combineReducers } from 'redux';
import { userReducer } from '../reducers';
import { USER_LOGOUT } from '../constants';

const appReducer = combineReducers({
	/* your app’s top-level reducers */
	user: userReducer,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
		localStorage.clear();
	}

	return appReducer(state, action);
};

const Store = createStore(
	rootReducer,
	// @ts-ignore
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateStore = ReturnType<typeof Store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch;

// @ts-ignore
export default Store;
