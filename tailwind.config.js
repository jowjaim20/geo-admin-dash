const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	mood: 'jit',

	theme: {
		colors: {
			primary: {
				base: '#9E3DFF',
				10: '#5850EC',
				50: '#ECF1F6',
				100: '#D5DEEC',
				200: '#9CB5F3',
				300: '#7D94B2',
				400: '#6875F5',
				500: '#514DD6',
				600: '#3E39B7',
				700: '#2B2789',
				800: '#181957',
				900: '#f9f5ff'
			},
			secondary: {
				base: '#0D1020',
				50: '#363C59',
				100: '#262B42',
				200: '#191D30',
				300: '#131728',
			},
			warning: {
				50: '#FFFAEB',
				700: '#B54708'
			},
			gray: {
				50: '#F9FAFB',
				100: '#F1F1F1',
				200: '#EAECF0',
				300: '#CDCDCD',
				400: '#A1A1A1',
				500: '#757575',
				600: '#4B5563',
				700: '#374151',
				800: '#1A1A1A',
				900: '#101828',
				border: '#475467',
			},
			success: {
				50: '#ECFDF3',
				100: '#E8F9E7',
				200: '#C9E9C8',
				300: '#AED6AA',
				400: '#6DAB64',
				500: '#558E4B',
				600: '#397031',
				700: '#27571F',
				800: '#1C4614',
			},
			error: {
				50: '#FEF3F2',
				300: '#FDA29B',
				500: '#F04438',
				700: '#B42318'
			},
			red: {
				100: '#FEE2E2',
				800: '#991B1B',
				900: '#7F1D1D',
			},
			alert: {
				100: '#FAE4E3',
				200: '#F6BFBE',
				300: '#F19D9E',
				400: '#DE5A55',
				500: '#BE2E2D',
				600: '#9D2226',
				700: '#7E181F',
				800: '#580F18',
				900: '#EA4F49',
			},
			subtle: {
				50: '#ECF1F6',
				100: '#D5DEEC',
				200: '#ACBCD3',
				300: '#7D94B2',
				400: '#617192',
				500: '#4D5674',
				600: '#3B4057',
				700: '#232739',
				800: '#181A25',
			},
			support: {
				1: { base: '#EDEEEF', 200: ' rgba(246, 246, 247, 0.4);' },
				2: { base: '#42CB99', 100: 'rgba(52, 211, 153, 0.2)', 200: 'rgba(66, 203, 153, 0.4)', 300: 'rgba(66, 203, 153, 0.6)' },
				3: { base: '#FBA33C' },
				4: { base: '#5F6DFB', 100: 'rgba(95, 109, 251, 0.2)' },
				5: { base: '#E75050', 100: 'rgba(231, 80, 80, 0.2)' },
			},
			supportMandy: {
				base: '#DD6363',
			},
			supportShamrock: {
				base: '#42CB99',
				100: 'rgba(52, 211, 153, 0.2)',
				200: 'rgba(66, 203, 153, 0.4)',
				300: 'rgba(66, 203, 153, 0.6)',
			},
			supportNeonCarrot: {
				100: 'rgba(251, 163, 60, 0.2)',
			},
			green: {
				100: '#D1FAE5',
				800: '#065F46',
				900: '#064E3B',
			},
			accent: {
				pink: { base: '#EF5A92', 200: '#FFA4C9', 400: '#D1305D' },
				orange: { base: '#FE895E', 200: '#FFB696', 400: '#CF583D' },
			},
			customRing: {
				primary: '#F4EBFF',
				secondary: '#F2F4F7',
				destructive: '#FEE4E2',
			},
			neutral: {
				200: '#DCE0E6',
			},
			white: colors.white,
			black: colors.black,
			// ...
			customForms: theme => ({
				default: {
					checkbox: {
						'&:focus': {
							outline: 'none',
							boxShadow: 'none',
							borderColor: 'none',
						},
					},
				},
			}),
		},
		fontFamily: {
			roboto: ['Roboto Mono', 'Open Sans'],
			inter: ['Inter']
		},
	},
	variants: {
		extend: {
			backgroundColor: ['active', 'hover', 'disabled', 'checked'],
			borderColor: ['checked'],
		},
	},
};
