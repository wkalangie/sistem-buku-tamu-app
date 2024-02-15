/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';

// material ui
import { Box, Button, Grid, Typography, Stack } from '@mui/material';

// project imports
import { IconHome } from '@tabler/icons-react';
import AnimateButton from '@/ui-component/extended/AnimateButton';

// assets
import IcErrorPageNotFound from '@/assets/images/error/ic_error_page_not_found.png';

const NotFound = () => (
    <Grid container>
        <Grid item xs={12}>
            <Stack alignItems="center" justifyContent="center" textAlign="center">
                <Box component="img" src={IcErrorPageNotFound} width={{ xs: 400, md: 500 }} />
                <Stack gap={2} alignItems="center" justifyContent="center">
                    <Typography variant="h1">Halaman Tidak Ditemukan!</Typography>
                    <Typography variant="body2">
                        Halaman yang Anda cari telah dipindahkan, dihapus, diganti namanya, atau mungkin tidak pernah ada!
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

export default NotFound;
