/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
// @ts-ignore
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './redux/store';

// Use consistent styling
import './index.css';
import './styles/index.scss';
import './styles/global.scss';

// Import root app
import '@fonts/stylesheet.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'animate.css';
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from './reportWebVitals';

import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

// Initialize languages
import './locales/i18n';
import { ENV_CONFIG } from './shared/env';
import App from './app';
import GlobalSlideover from '@components/Slideovers';

//test for netlify
// const store = configureAppStore();
if (process.env.NODE_ENV === 'production') {
	Sentry.init({
		dsn: ENV_CONFIG.sentry_dsn,
		integrations: [new Integrations.BrowserTracing()],

		// We recommend adjusting this value in production, or using tracesSampler
		// for finer control
		tracesSampleRate: 1.0,
	});
}

const MOUNT_NODE = document.getElementById('root') as HTMLElement;

ReactDOM.render(
	<Provider store={Store}>
		<HelmetProvider>
			<GlobalSlideover />
			<App />
		</HelmetProvider>
	</Provider>,
	MOUNT_NODE,
);

// Hot reloadable translation json files
if (module.hot) {
	module.hot.accept(['./locales/i18n'], () => {
		// No need to render the App again because i18next works with the hooks
	});
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
