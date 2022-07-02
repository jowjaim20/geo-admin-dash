import { WikiModuleIcon } from '@utils/svg-icons';
import { CustomTrialPage } from '@pages/PlanManagement';
import UserManagement from '@pages/UserManagement';
import Refunds from '@pages/Refunds';
import Chargebacks from '@pages/Chargebacks';
import AdminMagement from '@pages/AdminManagement';
import DashboardPage from '@pages/Dashboard';
import StandardPlansPage from '@pages/StandardPlans';
import PeerReportsPage from '@pages/PeerReports';
import ProxyStatusPage from '@pages/ProxyStatus';
import SuppliersPage from '@pages/Suppliers';
import KycPage from '@pages/Kyc';
import FastSpringPage from '@pages/FastSpring';
import FraudsPage from '@pages/Frauds';

export const ROUTE_KEYS = {
	PLAN_MANAGEMENT: 'PLAN_MANAGEMENT',
	USER_MANAGEMENT: 'USER_MANAGEMENT',
	PROXY_CHECKER: 'PROXY_CHECKER',
	REFUNDS: 'REFUNDS',
	CHARGEBACKS: 'CHARGEBACKS',
	PRIVACY: 'PRIVACY',
	IP_POOL: 'IP_POOL',
	ADMIN_MANAGEMENT: 'ADMIN_MANAGEMENT',
	COUPONS: 'COUPONS',
	REPOCKET_MANAGEMENT: 'REPOCKET_MANAGEMENT',
	DASHBOARD: 'DASHBOARD',
	SUPPLIER_MANAGEMENT: 'SUPPLIER_MANAGEMENT',
	KYC: 'KYC',
	WIKI_MODULE: 'WIKI_MODULE',
	STRAPI_CMS: 'STRAPI_CMS',
	PAYMENT_PROVIDERS: 'PAYMENT_PROVIDERS',
	FRAUDS: 'FRAUDS',
	LOGOUT: 'LOGOUT',
};

export const routes: any = [
	{
		title: 'Dashboard',
		path: '/dashboard',
		key: ROUTE_KEYS.DASHBOARD,
		component: DashboardPage,
		children: [],
	},
	{
		title: 'Plan & Trial management',
		key: ROUTE_KEYS.PLAN_MANAGEMENT,
		children: [
			{
				path: '/plan-and-trial-management/standard-plans',
				label: 'Standard Plans',
				exact: true,
				component: StandardPlansPage,
				key: 'STANDARD_PLANS',
			},
			{
				path: '/plan-and-trial-management/custom-trial',
				label: 'Custom trial',
				exact: true,
				component: CustomTrialPage,
				key: 'CUSTOM_TRIAL',
			},
		],
	},
	{
		title: 'User management',
		path: '/user-management',
		key: ROUTE_KEYS.USER_MANAGEMENT,
		component: UserManagement,
		children: [],
	},
	{
		title: 'Repocket Management',
		path: '/repocket-management',
		key: ROUTE_KEYS.REPOCKET_MANAGEMENT,
		children: [
			{
				path: '/repocket-management/peer-reports',
				label: 'Peer reports',
				exact: true,
				component: PeerReportsPage,
				key: 'PEER_REPORTS',
			},
		],
	},
	{
		title: 'Admin management',
		path: '/admin-management',
		key: ROUTE_KEYS.ADMIN_MANAGEMENT,
		component: AdminMagement,
		children: [],
	},
	{
		title: 'Supplier management',
		key: ROUTE_KEYS.SUPPLIER_MANAGEMENT,
		children: [
			{
				path: '/supplier-management/proxy-status',
				label: 'Proxy Status',
				exact: true,
				component: ProxyStatusPage,
				key: 'PROXY_STATUS',
			},
			{
				path: '/supplier-management/suppliers',
				label: 'Suppliers',
				exact: true,
				component: SuppliersPage,
				key: 'SUPPLIERS',
			},
		],
	},
	{
		title: 'KYC',
		path: '/kyc',
		key: ROUTE_KEYS.KYC,
		component: KycPage,
		children: [],
	},
	{
		title: 'Wiki Module',
		path: { pathname: 'https://wiki.geonode.com/' },
		target: '_blank',
		icon: WikiModuleIcon,
		key: ROUTE_KEYS.WIKI_MODULE,
		children: [],
	},
	{
		title: 'Strapi CMS',
		path: { pathname: 'https://strapi-cms.geonode.com/admin/' },
		target: '_blank',
		icon: WikiModuleIcon,
		key: ROUTE_KEYS.STRAPI_CMS,
		children: [],
	},
	{
		title: 'Payment providers',
		key: ROUTE_KEYS.PAYMENT_PROVIDERS,
		children: [
			{
				label: 'FastSpring',
				path: '/payment-providers/fastspring',
				key: 'FASTSPRING',
				exact: true,
				component: FastSpringPage,
			},
		],
	},
	{
		title: 'Refunds',
		path: '/refunds',
		key: ROUTE_KEYS.REFUNDS,
		component: Refunds,
		children: [],
	},
	{
		title: 'Chargebacks',
		path: '/chargebacks',
		key: ROUTE_KEYS.CHARGEBACKS,
		component: Chargebacks,
		children: [],
	},
	{
		title: 'Frauds',
		path: '/frauds',
		key: ROUTE_KEYS.FRAUDS,
		component: FraudsPage,
		children: [],
	},
	{
		title: 'Logout',
		path: '/admin-management',
		key: ROUTE_KEYS.LOGOUT,
		component: AdminMagement,
		children: [],
	},
	// {
	// 	title: 'Plan management',
	// 	icon: PlanManagementIcon,
	// 	key: ROUTE_KEYS.PLAN_MANAGEMENT,
	// 	children: [
	// 		{
	// 			path: '/plan-management/overview',
	// 			label: 'Overview',
	// 			exact: true,
	// 			component: CustomTrialPage,
	// 			key: 'overview',
	// 		},
	// 		{
	// 			path: '/plan-management/custom-trial',
	// 			label: 'Custom trial',
	// 			exact: true,
	// 			component: CustomTrialPage,
	// 			key: 'CUSTOM_TRIAL',
	// 		},
	// 	],
	// },
	// {
	// 	title: 'User management',
	// 	icon: UserManagementIcon,
	// 	path: '/user-management',
	// 	key: ROUTE_KEYS.USER_MANAGEMENT,
	// 	component: UserManagement,
	// 	children: [],
	// },
	// {
	// 	title: 'Proxy reports',
	// 	icon: ProxyStatusIcon,
	// 	path: '/proxy-reports',
	// 	key: ROUTE_KEYS.PROXY_CHECKER,
	// 	component: ProxyReports,
	// 	children: [],
	// },
	// {
	// 	title: 'Refunds',
	// 	icon: RefundsIcon,
	// 	path: '/refunds',
	// 	key: ROUTE_KEYS.REFUNDS,
	// 	component: Refunds,
	// 	children: [],
	// },
	// {
	// 	title: 'Chargebacks',
	// 	icon: ChargebacksIcon,
	// 	path: '/chargebacks',
	// 	key: ROUTE_KEYS.CHARGEBACKS,
	// 	component: Chargebacks,
	// 	children: [],
	// },
	// {
	// 	title: 'Privacy',
	// 	icon: PrivacyIcon,
	// 	path: '/privacy',
	// 	key: ROUTE_KEYS.PRIVACY,
	// 	component: Privacy,
	// 	children: [],
	// },
	// {
	// 	title: 'IP Pool',
	// 	icon: IpPoolIcon,
	// 	path: '/ip-pool',
	// 	key: ROUTE_KEYS.IP_POOL,
	// 	component: IpPool,
	// 	children: [],
	// },
	// {
	// 	title: 'Admin management',
	// 	icon: AdminManagementIcon,
	// 	path: '/admin-management',
	// 	key: ROUTE_KEYS.ADMIN_MANAGEMENT,
	// 	component: AdminMagement,
	// 	children: [],
	// },
	// {
	// 	title: 'Coupons',
	// 	icon: CouponsIcon,
	// 	path: '/coupons',
	// 	key: ROUTE_KEYS.COUPONS,
	// 	component: Coupons,
	// 	children: [],
	// },
];

export default routes;
