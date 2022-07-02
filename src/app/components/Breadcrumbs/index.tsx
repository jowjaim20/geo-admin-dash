import React from 'react';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import breadcrumbsConfig from '@components/Breadcrumbs/config';

// const userNamesById = { '1': 'John' };

// const DynamicUserBreadcrumb = ({ match }) => <span>{userNamesById[match.params.userId]}</span>;

// define custom breadcrumbs for certain routes.
// breadcumbs can be components or strings.

// map & render your breadcrumb components however you want.
const Breadcrumbs = () => {
	const breadcrumbs = useBreadcrumbs(breadcrumbsConfig);

	return <div>Breadcrumbs</div>;
};

export default Breadcrumbs;
