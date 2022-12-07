import './assets/icon-font/style.css';

const theme = {
  globals: {
    '*': {
      padding: 0, margin: 0,
      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  },
  colors: {
    white: '#ffffff',
    transparent: 'transparent',
    // --- gray ---
    gray25: '#fcfcfd',
    gray50: '#f9fafb',
    gray100: '#f2f4f7',
    gray200: '#eaecf0',
    gray300: '#d0d5dd',
    gray400: '#98a2b3',
    gray500: '#667085',
    gray600: '#475467',
    gray700: '#344054',
    gray800: '#1d2939',
    gray900: '#101828',
    // --- primary ---
    primary25: '#FCFAFF',
    primary50: '#F9F5FF',
    primary100: '#F4EBFF',
    primary200: '#E9D7FE',
    primary300: '#D6BBFB',
    primary400: '#B692F6',
    primary500: '#9E77ED',
    primary600: '#7F56D9',
    primary700: '#6941C6',
    primary800: '#53389E',
    primary900: '#42307D',
    // --- error ---
    error25: '#FFFBFA',
    error50: '#FEF3F2',
    error100: '#FEE4E2',
    error200: '#FECDCA',
    error300: '#FDA29B',
    error400: '#F97066',
    error500: '#F04438',
    error600: '#D92D20',
    error700: '#B42318',
    error800: '#912018',
    error900: '#7A271A',
    // --- warning ----
    warning25: '#FFFCF5',
    warning50: '#FFFAEB',
    warning100: '#FEF0C7',
    warning200: '#FEDF89',
    warning300: '#FEC84B',
    warning400: '#FDB022',
    warning500: '#F79009',
    warning600: '#DC6803',
    warning700: '#B54708',
    warning800: '#93370D',
    warning900: '#7A2E0E',
  },
  fonts: {
    display2xl: 72,
    displayxl: 60,
    displaylg: 48,
    displaymd: 36,
    displaysm: 30,
    displayxs: 24,
    textxl: 20,
    textlg: 18,
    textmd: 16,
    textsm: 14,
    textxs: 12
  },
  weights: {
    regular: '300',
    medium: '400',
    semibold: '500',
    bold: '600'
  },
  shadows: {
    xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
    sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
    md: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
    lg: '0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)',
    xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
    xxl: '0px 24px 48px -12px rgba(16, 24, 40, 0.18)',
    xxxl: '0px 32px 64px -12px rgba(16, 24, 40, 0.14)'
  }
}

export default theme;
