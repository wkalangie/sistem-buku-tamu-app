// assets
import { IconBook2, IconDashboard } from '@tabler/icons-react';

// constant
const icons = {
    IconBook2,
    IconDashboard
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const staff = {
    id: 'staff',
    title: 'staff',
    caption: 'staff',
    icon: null,
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/staff/dashboard',
            icon: icons.IconDashboard,
            breadcrumbs: false,
            external: false,
            target: false
        },
        {
            id: 'guest-book',
            title: 'Buku Tamu',
            type: 'item',
            url: '/staff/guest-book',
            icon: icons.IconBook2,
            breadcrumbs: false,
            external: false,
            target: false
        }
    ]
};

export default staff;
