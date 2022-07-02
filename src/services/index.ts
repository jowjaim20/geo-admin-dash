import httpService from './http.service';

import { ApiService, ApiService2 } from './api.service';
// import { AlertService } from './alert.service';
// import { AuthService } from './auth.service';
// import { InviteService } from './invite.service';
import { LoaderService } from './loader.service';
// import { EventTrackingService } from './eventTracking.service';
// import { ModalService } from './modal.service';
import { NotificationService } from './notification.service';
// import { UserService } from './user.service';
// import { ConfigurationService } from './configuration.service';
// import { StripeService } from './stripe.service';
import { UtilsService } from '@services/utils.service';
import { SlideoverService } from '@services/slideovers.service';

// const authApiService = new ApiService('auth');
// const proxyApiService = new ApiService('proxy');
// const accountApiService = new ApiService('account');
// const userApiService = new ApiService('user');
// const proxyServiceApiService = new ApiService('service');
// const paymentsApiService = new ApiService('payments');
// const configurationApiService = new ApiService('configuration');
// const conversionApiService = new ApiService('conversion');
// const inviteApiService = new ApiService('invite');
// const referralApiService = new ApiService('creferral');

const customPlanApiService = new ApiService('payments');
const adminServiceApiService = new ApiService('service');
const proxyStatusService = new ApiService2('monitor');
const customTrial = new ApiService('payments');

// const alertService = new AlertService();
// const userService = new UserService();
const loaderService = new LoaderService();
// const modalService = new ModalService();
const notificationService = new NotificationService();
// const authService = new AuthService();
// const inviteService = new InviteService();
// const configurationService = new ConfigurationService();
// const eventTrackingApiService = new EventTrackingService();
// const stripeService = new StripeService();
const slideoverService = new SlideoverService();
const utilsService = new UtilsService();

export {
	//system services
	httpService,
	// authService,
	// userService,
	// inviteService,
	// monitorService,
	//api services
	adminServiceApiService,
	customPlanApiService,
	// authApiService,
	// proxyApiService,
	// accountApiService,
	// userApiService,
	// proxyServiceApiService,
	// conversionApiService,
	// eventTrackingApiService,
	// inviteApiService,
	// referralApiService,
	// paymentsApiService,
	// configurationApiService,
	// stripeService,
	//helper services
	// modalService,
	notificationService,
	loaderService,
	// alertService,
	// configurationService,
	slideoverService,
	utilsService,
	proxyStatusService,
	customTrial
};
