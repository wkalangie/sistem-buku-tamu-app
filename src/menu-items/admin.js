// assets
import { IconBook2, IconDashboard, IconUserCog, IconReport } from '@tabler/icons-react';

// constant
const icons = {
    IconBook2,
    IconDashboard,
    IconUserCog,
    IconReport
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const admin = {
    id: 'admin',
    title: 'admin',
    caption: 'admin',
    icon: null,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/admin/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            external: false,
            target: false
        },
        {
            id: 'user-management',
            title: 'Manajemen Pengguna',
            type: 'item',
            url: '/admin/user-management',
            icon: icons.IconUserCog,
            breadcrumbs: false,
            external: false,
            target: false
        },
        {
            id: 'guest-book',
            title: 'Buku Tamu',
            type: 'item',
            url: '/admin/guest-book',
            icon: icons.IconBook2,
            breadcrumbs: false,
            external: false,
            target: false
        },
        {
            id: 'report',
            title: 'Laporan',
            type: 'item',
            url: '/admin/report',
            icon: icons.IconReport,
            breadcrumbs: false,
            external: false,
            target: false
        }
    ]
};

export default admin;
