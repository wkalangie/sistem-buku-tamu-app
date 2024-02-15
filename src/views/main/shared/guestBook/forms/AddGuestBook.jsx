import { useState, useEffect } from 'react';

import { Grid, Stack, Button, Typography, Alert, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// api
import { useDispatch, useSelector } from '@/store';
import { getGuestBook, createGuestBook } from '@/store/slices/guestBook';
import { getSummaryGlobal } from '@/store/slices/summary';

// project imports
import useAuth from '@/hooks/useAuth';

// third party
import * as yup from 'yup';
import { useFormik } from 'formik';

const AddGuestBook = ({ onClose }) => {
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { errorCreate, loadingCreate } = useSelector((state) => state.guestBook);

    const [isDone, setIsDone] = useState(false);

    const validationSchema = yup.object().shape({
        full_name: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
        email: yup.string().email('Format Tidak Valid').required('Wajib Diisi'),
        phone: yup.string().min(10, 'Harus minimal 10 karakter').required('Wajib Diisi'),
        instance: yup.string().min(2, 'Harus minimal 2 karakter').required('Wajib Diisi'),
        visit_purpose: yup.string().required('Wajib Diisi')
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            full_name: '',
            email: '',
            phone: '',
            instance: '',
            visit_purpose: '',
            id_client: user?.id
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsDone(false);
            await dispatch(createGuestBook(values));
            setIsDone(true);
        }
    });

    useEffect(() => {
        if (!errorCreate && !loadingCreate && isDone) {
            dispatch(getGuestBook());
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
                        <Grid item xs={12} md={6}>
                            <Stack spacing={1}>
                                <Typography>Instansi / Perusahaan</Typography>
                                <TextField
                                    fullWidth
                                    id="instance"
                                    name="instance"
                                    placeholder="Instansi / Perusahaan"
                                    value={formik.values.instance}
                                    onChange={formik.handleChange}
                                    error={formik.touched.instance && Boolean(formik.errors.instance)}
                                    helperText={formik.touched.instance && formik.errors.instance}
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
                                <Typography>Nomor Handphone / Telepon</Typography>
                                <TextField
                                    fullWidth
                                    id="phone"
                                    name="phone"
                                    placeholder="Nomor Handphone / Telepon"
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                    error={formik.touched.phone && Boolean(formik.errors.phone)}
                                    helperText={formik.touched.phone && formik.errors.phone}
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
                    </Grid>
                </Grid>
                {/* 3 */}
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <Typography>Tujuan Kunjungan</Typography>
                        <TextField
                            fullWidth
                            id="visit_purpose"
                            name="visit_purpose"
                            placeholder="Tujuan Kunjungan"
                            multiline
                            rows={3}
                            value={formik.values.visit_purpose}
                            onChange={formik.handleChange}
                            error={formik.touched.visit_purpose && Boolean(formik.errors.visit_purpose)}
                            helperText={formik.touched.visit_purpose && formik.errors.visit_purpose}
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

export default AddGuestBook;
