import { useState, useEffect } from 'react';

import { Grid, Stack, Button, Typography, Alert, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getUsers, createUser } from '@/store/slices/user';
import { getSummaryGlobal } from '@/store/slices/summary';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddUser = ({ onClose }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { errorCreate, loadingCreate } = useSelector((state) => state.user);

    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        id_employee: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
        full_name: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
        email: yup.string().email('Format Tidak Valid').required('Wajib Diisi'),
        password: yup.string().min(5, 'Harus minimal 5 karakter').required('Wajib Diisi'),
        role: yup.string().notOneOf(['0'], 'Wajib Dipilih').nullable().required('Wajib Dipilih'),
        status: yup.string().notOneOf(['0'], 'Wajib Dipilih').nullable().required('Wajib Dipilih')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id_employee: '',
            full_name: '',
            email: '',
            password: '',
            role: '0',
            status: '0',
            id_client: user?.id
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(createUser(values));
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && !loadingCreate && isDone) {
            dispatch(getUsers());
            dispatch(getSummaryGlobal());
            onClose();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDone, errorCreate, loadingCreate]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                {errorCreate && (
                    <Grid item xs={12}>
                        <Alert severity="error">{errorCreate?.message}</Alert>
                    </Grid>
                )}
                {/* 1 */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>ID Pekerja</Typography>
                                <TextField
                                    fullWidth
                                    id="id_employee"
                                    name="id_employee"
                                    placeholder="ID Pekerja"
                                    value={formik.values.id_employee}
                                    onChange={formik.handleChange}
                                    error={formik.touched.id_employee && Boolean(formik.errors.id_employee)}
                                    helperText={formik.touched.id_employee && formik.errors.id_employee}
                                    inputProps={{
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off'
                                        }
                                    }}
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Nama Lengkap</Typography>
                                <TextField
                                    fullWidth
                                    id="full_name"
                                    name="full_name"
                                    placeholder="Nama Lengkap"
                                    value={formik.values.full_name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                                    helperText={formik.touched.full_name && formik.errors.full_name}
                                    inputProps={{
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off'
                                        }
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* 2 */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Email</Typography>
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                    inputProps={{
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off'
                                        }
                                    }}
                                    autoComplete="off"
                                />
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Password</Typography>
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    placeholder="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        autoComplete: 'off',
                                        form: {
                                            autoComplete: 'off'
                                        }
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* 3 */}
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Peran</Typography>
                                <TextField
                                    name="role"
                                    defaultValue="0"
                                    select
                                    value={formik.values.role}
                                    onChange={formik.handleChange}
                                    error={formik.touched.role && Boolean(formik.errors.role)}
                                    helperText={formik.touched.role && formik.errors.role}
                                >
                                    <MenuItem value="0" selected disabled>
                                        Pilih Role
                                    </MenuItem>
                                    <MenuItem value="01">Admin</MenuItem>
                                    <MenuItem value="02">Staff</MenuItem>
                                </TextField>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Status</Typography>
                                <TextField
                                    name="status"
                                    defaultValue="0"
                                    select
                                    value={formik.values.status}
                                    onChange={formik.handleChange}
                                    error={formik.touched.status && Boolean(formik.errors.status)}
                                    helperText={formik.touched.status && formik.errors.status}
                                >
                                    <MenuItem value="0" selected disabled>
                                        Pilih Status
                                    </MenuItem>
                                    <MenuItem value="01">Aktif</MenuItem>
                                    <MenuItem value="02">Non-Aktif</MenuItem>
                                </TextField>
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>
                {/* button */}
                <Grid container justifyContent="end" sx={{ mt: 3 }}>
                    <Grid item>
                        <Stack direction="row" alignItems="flex-end" spacing={2}>
                            <Button variant="outlined" color="error" onClick={onClose} disabled={formik.isSubmitting && loadingCreate}>
                                Batal
                            </Button>
                            <LoadingButton loading={formik.isSubmitting && loadingCreate} type="submit" variant="contained">
                                Simpan
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default AddUser;
