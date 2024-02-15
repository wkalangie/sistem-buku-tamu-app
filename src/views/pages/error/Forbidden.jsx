/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

// material ui
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

// project imports
import { IconHome } from '@tabler/icons-react';
import AnimateButton from '@/ui-component/extended/AnimateButton';

// assets
import IcErrorAccessDenied from '@/assets/images/error/ic_error_access_denied.png';

const Forbidden = () => (
    <Grid container>
        <Grid item xs={12}>
            <Stack alignItems="center" justifyContent="center" textAlign="center">
                <Box component="img" src={IcErrorAccessDenied} width={{ xs: 400, md: 500 }} />
                <Stack gap={2} alignItems="center" justifyContent="center">
                    <Typography variant="h1">Akses Dibatasi!</Typography>
                    <Typography variant="body2">
                        Halaman yang Anda coba akses memiliki akses terbatas. Silakan merujuk ke administrator sistem Anda
                    </Typography>
                    <AnimateButton>
                        <Button variant="contained" component={Link} to="/login" startIcon={<IconHome />}>
                            Home
                        </Button>
                    </AnimateButton>
                </Stack>
            </Stack>
        </Grid>
    </Grid>
);

export default Forbidden;
