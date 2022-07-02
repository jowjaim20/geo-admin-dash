import axios from 'axios';
import * as Promise from 'bluebird';
import { notificationService, loaderService } from './index';
// import {globals} from "../index";
// import promise from 'promise';

class HttpService {
	axios;
	auth;
	constructor(httpInterceptingHandler, httpResponseHandler, httpResponseErrorHandler) {
		this.axios = axios.create();
		this.axios.interceptors.request.use(httpInterceptingHandler);
		// response => response
		this.axios.interceptors.response.use(httpResponseHandler, httpResponseErrorHandler);
	}
	// CRUD
	get(url, params, options) {
		return this.axios.get(url, { params, ...options });
	}
	post(url, payload, options = {}) {
		return this.axios.post(url, payload, options);
	}
	put(url, payload, options = {}) {
		return this.axios.put(url, payload, options);
	}
	delete(url, data, options = {}) {
		return this.axios.delete(url, { data }, options);
	}
}

function accessTokenHandler(config) {
	// const accessToken = authService.getAccessToken();
	// // const accessToken = 'dasdsada';
	// //if token is found add it to the header
	// if (accessToken) {
	// 	if (config.method !== 'OPTIONS') {
	// 		config.headers.authorization = `Bearer ${accessToken}`;
	// 	}
	// } else {
	// 	// navigate(LOGIN_PAGE);
	// }
}
const httpInterceptingHandler = async config => {
	accessTokenHandler(config);
	console.log(config);

	// await authService.accessTokenHandler(config);
	// need to add http auth basic
	return config;
};

const httpResponseHandler = response => {
	if (response && response.data) {
		const { data } = response;
		if (data.message) {
			const { title, body, variant } = data.message;
			notificationService.openNotification({
				title: title,
				html: body,
				variant: variant || 'success',
			});
		}
	}
	return response;
};

// const extractErrMessage = payload => {
// 	if (!payload.err) {
// 		return payload.message;
// 	}

// 	if (payload.err) {
// 		return extractErrMessage(payload.err);
// 	}
// 	return null;
// };

const httpResponseErrorHandler = (data, params) => {
	const response = data && data.response;
	if (response) {
		// 401 un auth user
		if (response.status === 401) {
			if (response?.data?.message && response?.data?.showNotification) {
				notificationService.openNotification({
					title: 'Info',
					body: response.data.message,
					variant: 'info',
				});
			}
		}

		if (response.data.err && response.data.status !== 402) {
			if (response?.data?.showNotification) {
				notificationService.openNotification({
					title: 'Error',
					html: response.data.err,
					variant: 'error',
				});
				loaderService.setLoaderState(false);
			}
		}

		if (response.data) {
			// globals.growlRef.show({severity: 'error', summary: 'Error Message', detail: (typeof resp.error === 'string') ? resp.error  : ''});
			return Promise.reject(response.data);
			// Alert.alert('Error', resp.error);
		}
	} else {
		return Promise.reject({});
	}
};

const httpService = new HttpService(httpInterceptingHandler, httpResponseHandler, httpResponseErrorHandler);
export default httpService;
