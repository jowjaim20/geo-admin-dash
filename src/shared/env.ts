import basConfig from './config';

export const dev_config = {
	env: 'development',
	name: 'dev_config',
	apiUrl: 'http://localhost:8080/api',
	apiDashboardUrl: 'https://monitor.geonode.com',
	baseUrl: 'http://localhost:8080',
	supportEmail: 'hello@geonode.com',
	supportUrl: 'https://geonode.com/contact-us',
	stripe_key: 'pk_test_51HI9uxACIlWkZsaMSYm1KEJpxMV7LnTfj2C0Z0tKYytIed068xri66yvKpsxD48UM9op3C2zOBDcK90fA09VGWpK009qbXtlTS',
	sentry_dsn: 'https://2b78c361340c423b86752ebee911ac01@o1035736.ingest.sentry.io/6003301',
};

export const staging_config = {
	env: 'staging',
	name: 'staging_config',
	apiUrl: 'https://staging.geonode.com/api',
	apiDashboardUrl: 'https://monitor.geonode.com',
	baseUrl: 'https://staging.geonode.com',
	supportEmail: 'hello@geonode.com',
	supportUrl: 'https://geonode.com/contact-us',
	stripe_key: 'pk_test_51HI9uxACIlWkZsaMSYm1KEJpxMV7LnTfj2C0Z0tKYytIed068xri66yvKpsxD48UM9op3C2zOBDcK90fA09VGWpK009qbXtlTS',
	sentry_dsn: 'https://2b78c361340c423b86752ebee911ac01@o1035736.ingest.sentry.io/6003301',
};

export const prod_config = {
	env: 'production',
	name: 'prod_config',
	apiUrl: 'https://app.geonode.com/api',
	apiDashboardUrl: 'https://monitor.geonode.com',
	baseUrl: 'https://app.geonode.com',
	supportEmail: 'hello@geonode.com',
	supportUrl: 'https://geonode.com/contact-us',
	stripe_key: 'pk_live_51HI9uxACIlWkZsaMVsIkyYDoDYBIkzXj1BHdhK553VR5asMZEPVFceckM4M7jkpXa1VmdfDqmffBZ8eAah305RCM00hpp2Ac3V',
	sentry_dsn: 'https://2b78c361340c423b86752ebee911ac01@o1035736.ingest.sentry.io/6003301',
};

const getConfig = env => {
	if (process.env.REACT_APP_ENVIRONMENT === staging_config.env) return staging_config;

	switch (env) {
		case dev_config.env:
			return dev_config;

		case prod_config.env:
			return prod_config;

		default:
			return dev_config;
	}
};

let config = getConfig(process.env.NODE_ENV);
// process.env.REACT_APP_STAGE === 'prod' ? prod : dev; // TODO : CHAGE TO DEV

export const ENV_CONFIG = {
	// Add common config values here
	// @ts-ignore
	MAX_ATTACHMENT_SIZE: 5000000,
	...basConfig,
	...config,
};
