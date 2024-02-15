import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Link, Stack, Typography } from '@mui/material';

// project imports
import useAuth from '@/hooks/useAuth';
import { DASHBOARD_STAFF_PATH, DASHBOARD_ADMIN_PATH } from '@/config';

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
    const { user } = useAuth();
    return (
        <Link
            component={RouterLink}
            to={user?.role === '01' ? DASHBOARD_ADMIN_PATH : DASHBOARD_STAFF_PATH}
            aria-label="theme-logo"
            sx={{ textDecoration: 'none' }}
        >
            <Stack direction="row" alignItems="center">
                <Typography variant="h3" color="text.light">
                    Maheswara Solusi Teknologi
                </Typography>
            </Stack>
        </Link>
    );
};

export default LogoSection;
