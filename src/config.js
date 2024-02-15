import LAYOUT_CONST from '@/constant';

// basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
export const BASE_PATH = '';

export const DASHBOARD_ADMIN_PATH = '/admin/dashboard';
export const DASHBOARD_STAFF_PATH = '/staff/dashboard';

export const HORIZONTAL_MAX_ITEM = 6;

const config = {
    layout: LAYOUT_CONST.VERTICAL_LAYOUT,
    drawerType: LAYOUT_CONST.DEFAULT_DRAWER,
    fontFamily: `'Poppins', sans-serif`,
    borderRadius: 8,
    outlinedFilled: true,
    navType: 'light',
    presetColor: 'default',
    locale: 'en',
    rtlLayout: false,
    container: false
};

export default config;
