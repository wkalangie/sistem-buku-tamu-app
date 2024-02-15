import { useState, useEffect } from 'react';

// material ui
import { Grid, Stack, Button, CircularProgress } from '@mui/material';

// third-party
import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');

const DetailGuestBook = ({ data, onClose }) => {
    const dateTemp = new Date();
    const date = moment(dateTemp).format();

    // state
    const [row, setRow] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setRow([
            {
                id: 'full_name',
                title: 'Nama Lengkap',
                value: data?.full_name || '-'
            },
            {
                id: 'email',
                title: 'Email',
                value: data?.email || '-'
            },
            {
                id: 'phone',
                title: 'Nomor Handphone',
                value: data?.phone || '-'
            },
            {
                id: 'instance',
                title: 'Instansi',
                value: data?.instance || '-'
            },
            {
                id: 'created',
                title: 'Jam, Tanggal Kunjungan',
                value: data?.created || '-'
            },
            {
                id: 'visit_purpose',
                title: 'Tujuan Kunjungan',
                value: data?.visit_purpose || '-'
            },
            {
                id: 'employee_name',
                title: 'Pekerja yang menerima',
                value: data?.employee_name || '-'
            }
        ]);
        setLoading(false);
    }, [data]);

    return (
        <Grid container gap={2}>
            {loading ? (
                <Grid item xs={12} textAlign="center" pt={2}>
                    <CircularProgress />
                </Grid>
            ) : (
                <>
                    {row?.map((item, key) => (
                        <Grid item xs={12} key={key}>
                            <Grid container>
                                <Grid item xs={3}>
                                    {item?.title || '-'}
                                </Grid>
                                <Grid item xs={0.5} textAlign="center">
                                    :
                                </Grid>
                                <Grid item xs={8.5}>
                                    {item?.id === 'created'
                                        ? `Jam ${moment(item?.value || date).format('hh:ss A, DD MMMM YYYY')}`
                                        : item?.value !== '' || null
                                        ? item?.value
                                        : '-'}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))}
                </>
            )}
            <Grid container justifyContent="end" sx={{ mt: 3 }}>
                <Grid item>
                    <Stack direction="row" alignItems="flex-end" spacing={2}>
                        <Button variant="outlined" color="error" onClick={onClose}>
                            Tutup
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DetailGuestBook;
