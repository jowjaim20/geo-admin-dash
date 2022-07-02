import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
// import LoginPage from '@pages/Login/LoginPage';
// import SignupPage from '@pages/Login/SignupPage';
// import ResetPasswordPage from '@pages/Login/ResetPasswordPage';
// import ConfirmPage from '@pages/Login/ConfirmPage';

const PublicRoutes = () => {
	return (
		<Switch>
			{/* <Route exact path="/login" component={LoginPage} />
			<Route exact path="/signup" component={SignupPage} />
			<Route exact path="/confirm" component={ConfirmPage} />
			<Route exact path="/reset-password" component={ResetPasswordPage} />
			<Redirect from="/*" to="/login" /> */}
		</Switch>
	);
};

export default PublicRoutes;
