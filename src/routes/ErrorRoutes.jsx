import { lazy } from 'react';

// project imports
import Loadable from '@/ui-component/Loadable';
import MinimalLayout from '@/layout/MinimalLayout';

// maintenance routing
const MaintenanceForbidden = Loadable(lazy(() => import('@/views/pages/error/Forbidden')));
const MaintenanceError = Loadable(lazy(() => import('@/views/pages/error/NotFound')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const ErrorRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/forbidden',
            element: <MaintenanceForbidden />
        },
        {
            path: '*',
            element: <MaintenanceError />
        }
    ]
};

export default ErrorRoutes;
