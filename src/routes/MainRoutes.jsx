import { lazy } from 'react';

// project imports
import AuthGuard from '@/utils/route-guard/AuthGuard';
import AdminGuard from '@/utils/route-guard/AdminGuard';
import StaffGuard from '@/utils/route-guard/StaffGuard';
import MainLayout from '@/layout/MainLayout';
import Loadable from '@/ui-component/Loadable';

// shared routing
const SharedGuestBook = Loadable(lazy(() => import('@/views/main/shared/guestBook')));

// admin routing
const AdminDashboard = Loadable(lazy(() => import('@/views/main/admin/dashboard')));
const AdminUserManagement = Loadable(lazy(() => import('@/views/main/admin/userManagement')));
const AdminReport = Loadable(lazy(() => import('@/views/main/admin/report')));

// staff routing
const StaffDashboard = Loadable(lazy(() => import('@/views/main/staff/dashboard')));

// ==============================|| AUTH ROUTING ||============================== //
// admin routes
export const AdminRoutes = {
    path: '/admin',
    element: (
        <AuthGuard>
            <AdminGuard>
                <MainLayout />
            </AdminGuard>
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard',
            element: <AdminDashboard />
        },
        {
            path: 'user-management',
            element: <AdminUserManagement />
        },
        {
            path: 'guest-book',
            element: <SharedGuestBook />
        },
        {
            path: 'report',
            element: <AdminReport />
        }
    ]
};

// staff routes
export const StaffRoutes = {
    path: '/staff',
    element: (
        <AuthGuard>
            <StaffGuard>
                <MainLayout />
            </StaffGuard>
        </AuthGuard>
    ),
    children: [
        {
            path: 'dashboard',
            element: <StaffDashboard />
        },
        {
            path: 'guest-book',
            element: <SharedGuestBook />
        }
    ]
};
