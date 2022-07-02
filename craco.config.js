const CracoAlias = require('craco-alias');

// TODO: NEED TO SOLVE CSS LOADER ISSUE
module.exports = {
	style: {
		modules: {
			localIdentName: '',
		},
		css: {
			loaderOptions: {
				/* Any css-loader configuration options: https://github.com/webpack-contrib/css-loader. */
			},
			loaderOptions: (cssLoaderOptions, { env, paths }) => {
				return cssLoaderOptions;
			},
		},
		sass: {
			loaderOptions: {
				/* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
			},
			loaderOptions: (sassLoaderOptions, { env, paths }) => {
				return sassLoaderOptions;
			},
		},
		scss: {
			loaderOptions: {
				/* Any sass-loader configuration options: https://github.com/webpack-contrib/sass-loader. */
			},
			loaderOptions: (sassLoaderOptions, { env, paths }) => {
				return sassLoaderOptions;
			},
		},
		postcss: {
			plugins: [require('tailwindcss'), require('autoprefixer')],
		},
	},
	plugins: [
		{
			plugin: CracoAlias,
			options: {
				source: 'tsconfig',
				baseUrl: './src',
				/* tsConfigPath should point to the file where "baseUrl" and "paths"
        are specified*/
				tsConfigPath: './tsconfig.paths.json',
			},
		},
		{ plugin: require('craco-plugin-react-hot-reload') },
		// { plugin: require('craco-cesium')() },
	],
	webpack: {
		alias: {
			'react-dom': '@hot-loader/react-dom',
		},
	},
};
