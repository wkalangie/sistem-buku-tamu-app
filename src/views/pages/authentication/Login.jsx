// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Box, Typography } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';
import LoginForm from './forms/LoginForm';

// assets
import IcLoginBg from '@/assets/images/page/ic_login_bg.jpg';
import IcLogin from '@/assets/images/page/ic_login.png';

const Login = () => {
    const theme = useTheme();
    return (
        <Grid
            container
            sx={{
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${IcLoginBg})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}
            p={15}
        >
            <Grid item xs={12} sx={{ height: '100%' }}>
                <MainCard elevation={16} boxShadow shadow={theme.shadows[16]} sx={{ borderRadius: 5 }}>
                    <Grid container sx={{ height: '100%' }} p={3}>
                        <Grid item xs={0} md={6.5} sx={{ height: '100%' }}>
                            <Stack sx={{ height: '100%' }} direction="column" alignItems="center" justifyContent="center" gap={3}>
                                <Box component="img" src={IcLogin} sx={{ width: '50%' }} />
                                <Typography variant="h3" sx={{ color: theme.palette.primary.main }}>
                                    Maheswara Solusi Teknologi
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={5.5}>
                            <Stack sx={{ height: '100%' }} direction="column" justifyContent="center" gap={3}>
                                <Stack gap={1}>
                                    <Typography variant="h2" textAlign="center" sx={{ color: theme.palette.primary.main }}>
                                        Selamat Datang!
                                    </Typography>
                                    <Typography variant="h1" textAlign="center" sx={{ fontWeight: 200, color: theme.palette.primary.main }}>
                                        Sistem Buku Tamu
                                    </Typography>
                                </Stack>
                                <LoginForm />
                            </Stack>
                        </Grid>
                    </Grid>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Login;
