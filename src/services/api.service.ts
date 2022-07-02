import httpService from './http.service';
import { ENV_CONFIG } from '../shared/env';
// const environment = getEnvVars;

export class ApiService {
	baseApi;
	constructor(path = '') {
		this.baseApi = `${ENV_CONFIG.apiUrl}/${path}`;
	}
	get(endpoint = '', params?, options = {}) {
		return httpService.get(`${this.baseApi}${endpoint}`, params, options);
	}
	post(endpoint = '', payload?, options = {}) {
		return httpService.post(`${this.baseApi}${endpoint}`, payload, options);
	}
	put(endpoint = '', payload?, options = {}) {
		return httpService.put(`${this.baseApi}${endpoint}`, payload, options);
	}
	delete(endpoint = '', data?, options = {}) {
		return httpService.delete(`${this.baseApi}${endpoint}`, data, options);
	}
}

export class ApiService2 {
	baseApi;
	constructor(path = '') {
		this.baseApi = `${ENV_CONFIG.apiDashboardUrl}/${path}`;
	}
	get(endpoint = '', params?, options = {}) {
		return httpService.get(`${this.baseApi}${endpoint}`, params, options);
	}
	post(endpoint = '', payload?, options = {}) {
		return httpService.post(`${this.baseApi}${endpoint}`, payload, options);
	}
	put(endpoint = '', payload?, options = {}) {
		return httpService.put(`${this.baseApi}${endpoint}`, payload, options);
	}
	delete(endpoint = '', data?, options = {}) {
		return httpService.delete(`${this.baseApi}${endpoint}`, data, options);
	}
}
