/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React, { Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import { hot } from 'react-hot-loader';
import PrivateRoutes from '@routes/PrivateRoutes';

function App() {
	const { i18n } = useTranslation();

	return (
		<BrowserRouter>
			<Suspense fallback={<div>Loading...</div>}>
				<Helmet htmlAttributes={{ lang: i18n.language }}>
					<title>Geonode Dashboard</title>
					<meta name="description" content="Internet Privacy and Freedom for Everyone, Everywhere" />
				</Helmet>
				<PrivateRoutes />
				{/* {appIsReady ? isLoggedIn ? <PrivateRoutes /> : <PublicRoutes /> : null} */}
			</Suspense>
		</BrowserRouter>
	);
}

export default hot(module)(App);
