import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from '@/hooks/useAuth';
import { DASHBOARD_STAFF_PATH, DASHBOARD_ADMIN_PATH } from '@/config';

// ==============================|| GUEST GUARD ||============================== //

/**
 * Guest guard for routes having no auth required
 * @param {PropTypes.node} children children element/node
 */

const GuestGuard = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (['01'].includes(user?.role)) {
                navigate(DASHBOARD_ADMIN_PATH, { replace: true });
            } else if (['02'].includes(user?.role)) {
                navigate(DASHBOARD_STAFF_PATH, { replace: true });
            } else {
                navigate('/forbidden');
            }
        }
    }, [isLoggedIn, navigate, user?.role]);

    return children;
};

GuestGuard.propTypes = {
    children: PropTypes.node
};

export default GuestGuard;
