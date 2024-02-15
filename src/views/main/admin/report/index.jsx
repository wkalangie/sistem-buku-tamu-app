import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import { Grid, Stack, Typography, Select, MenuItem, Divider, Card, CardContent, Button, CircularProgress } from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// api
import { useDispatch, useSelector } from '@/store';
import { getReport } from '@/store/slices/report';

// project imports
import ExportToXLSX from '@/ui-component/extended/ExportToXLSX';

// third-party
import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');

const report = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // filter
    const [search, setSearch] = useState(false);
    const [typeReport, setTypeReport] = useState('null');
    const handleChangeTypeReport = (event) => {
        setSearch(false);
        setTypeReport(event.target.value);
    };

    // year
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (typeReport === 'year') {
            setSelectedYear(moment(date).format('YYYY'));
        } else {
            const dateSplit = moment(date).format('M,YYYY').split(',');
            setSelectedMonth(dateSplit[0]);
            setSelectedYear(dateSplit[1]);
        }
    };

    const handleSearch = async () => {
        setSearch(true);
        if (typeReport === 'year') {
            await dispatch(getReport(`?type=year&year=${selectedYear}`));
        } else {
            await dispatch(getReport(`?month=${selectedMonth}&year=${selectedYear}`));
        }
    };

    // data
    const [data, setData] = useState([]);
    const { reports, loadingGet } = useSelector((state) => state.report);

    useEffect(() => {
        if (typeReport !== null) {
            setData(reports);
        }
    }, [reports]);

    const handleReset = () => {
        setData([]);
        setSelectedDate(null);
        setSelectedMonth(null);
        setSelectedYear(null);
        setSearch(false);
    };

    const handleExport = () => {
        if (typeReport === 'year') {
            ExportToXLSX(data, `Daftar Tamu Tahun ${selectedYear}`, selectedYear);
        } else {
            ExportToXLSX(data, `Daftar Tamu Bulan ${selectedMonth} Tahun ${selectedYear}`, `${selectedMonth} - ${selectedYear}`);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="h2">Laporan</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Stack direction="row" alignItems="center" gap={2}>
                        <Typography variant="h4" sx={{ fontWeight: 400 }}>
                            Pilih jangka laporan :
                        </Typography>
                        <Select value={typeReport} onChange={handleChangeTypeReport} size="small">
                            <MenuItem value="null" sx={{ display: 'none' }} selected>
                                Pilih Jangka
                            </MenuItem>
                            <MenuItem value="year">Pertahun</MenuItem>
                            <MenuItem value="month">Perbulan</MenuItem>
                        </Select>
                    </Stack>
                </Grid>
                {typeReport !== 'null' && (
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Divider sx={{ borderColor: theme.palette.primary.main }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={3}>
                                    {/* left */}
                                    <Grid item xs={12} md={4}>
                                        <Card sx={{ borderWidth: 1, boxShadow: 3 }}>
                                            <CardContent>
                                                <Grid container spacing={2}>
                                                    {typeReport === 'year' ? (
                                                        <Grid item xs={12}>
                                                            <DatePicker
                                                                views={['year']}
                                                                value={selectedDate}
                                                                onChange={handleDateChange}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disableMaskedInput
                                                            />
                                                        </Grid>
                                                    ) : (
                                                        <Grid item xs={12}>
                                                            <DatePicker
                                                                views={['month', 'year']}
                                                                value={selectedDate}
                                                                onChange={handleDateChange}
                                                                sx={{ width: '100%' }}
                                                                renderInput={(params) => <TextField {...params} />}
                                                                disableMaskedInput
                                                            />
                                                        </Grid>
                                                    )}
                                                    <Grid item xs={12}>
                                                        <Stack direction="row" alignItems="center" gap={1}>
                                                            <Button
                                                                variant="contained"
                                                                size="medium"
                                                                fullWidth
                                                                onClick={() => handleSearch()}
                                                            >
                                                                Cari
                                                            </Button>
                                                            <Button
                                                                variant="contained"
                                                                size="medium"
                                                                color="error"
                                                                fullWidth
                                                                onClick={() => handleReset(null)}
                                                            >
                                                                Reset
                                                            </Button>
                                                        </Stack>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    {/* right */}
                                    <Grid item xs={12} md={8}>
                                        <Card sx={{ borderWidth: 1, boxShadow: 3, height: '100%' }}>
                                            <CardContent sx={{ height: '100%' }}>
                                                <Grid container justifyContent="center" sx={{ height: '100%' }}>
                                                    <Grid item xs={12} sx={{ height: '100%' }}>
                                                        {!loadingGet && search === false && (
                                                            <Stack
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                sx={{ height: '100%' }}
                                                                gap={2}
                                                            >
                                                                <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
                                                                    Laporan {typeReport === 'year' ? 'Pertahun' : 'Perbulan'}
                                                                </Typography>
                                                            </Stack>
                                                        )}
                                                        {loadingGet && search === true && (
                                                            <Stack
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                sx={{ height: '100%' }}
                                                                gap={2}
                                                            >
                                                                <Typography variant="h3" sx={{ textTransform: 'capitalize' }}>
                                                                    Sedang mencari data
                                                                </Typography>
                                                                <CircularProgress />
                                                            </Stack>
                                                        )}
                                                        {!loadingGet && search === true && data?.length === 0 && (
                                                            <Stack
                                                                alignItems="center"
                                                                justifyContent="center"
                                                                sx={{ height: '100%' }}
                                                                gap={2}
                                                            >
                                                                <Typography variant="h3" sx={{ textTransform: 'capitalize' }} color="error">
                                                                    Data tidak ditemukan
                                                                </Typography>
                                                            </Stack>
                                                        )}
                                                        {!loadingGet && search === true && data?.length !== 0 && typeReport === 'year' && (
                                                            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            variant="h3"
                                                                            sx={{ textTransform: 'capitalize', textAlign: 'center' }}
                                                                        >
                                                                            Data ditemukan
                                                                        </Typography>
                                                                    </Grid>
                                                                    {/* tahun kunjungan */}
                                                                    <Grid item xs={12}>
                                                                        <Grid container alignItems="center" spacing={2}>
                                                                            <Grid item xs={4} md={3}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Typography variant="body1">Tahun kunjungan</Typography>
                                                                                    <Typography variant="body1">:</Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={4} md={3}>
                                                                                {selectedYear}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {/* jumlah kunjungan */}
                                                                    <Grid item xs={12}>
                                                                        <Grid container alignItems="center" spacing={2}>
                                                                            <Grid item xs={4} md={3}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Typography variant="body1">
                                                                                        Jumlah kunjungan
                                                                                    </Typography>
                                                                                    <Typography variant="body1">:</Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={4} md={3}>
                                                                                {data !== null && data?.length}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {/* button */}
                                                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            sx={{ fontWeight: 400, backgroundColor: '#875F9A' }}
                                                                            onClick={() => handleExport()}
                                                                        >
                                                                            Cetak
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Stack>
                                                        )}
                                                        {!loadingGet && search === true && data?.length !== 0 && typeReport === 'month' && (
                                                            <Stack alignItems="center" justifyContent="center" sx={{ height: '100%' }}>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={12}>
                                                                        <Typography
                                                                            variant="h3"
                                                                            sx={{ textTransform: 'capitalize', textAlign: 'center' }}
                                                                        >
                                                                            Data ditemukan
                                                                        </Typography>
                                                                    </Grid>
                                                                    {/* tahun kunjungan */}
                                                                    <Grid item xs={12}>
                                                                        <Grid container alignItems="center" spacing={2}>
                                                                            <Grid item xs={4} md={3}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Typography variant="body1">Tahun kunjungan</Typography>
                                                                                    <Typography variant="body1">:</Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={4} md={3}>
                                                                                {selectedYear}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {/* jumlah kunjungan */}
                                                                    <Grid item xs={12}>
                                                                        <Grid container alignItems="center" spacing={2}>
                                                                            <Grid item xs={4} md={3}>
                                                                                <Stack
                                                                                    direction="row"
                                                                                    alignItems="center"
                                                                                    justifyContent="space-between"
                                                                                >
                                                                                    <Typography variant="body1">
                                                                                        Jumlah kunjungan
                                                                                    </Typography>
                                                                                    <Typography variant="body1">:</Typography>
                                                                                </Stack>
                                                                            </Grid>
                                                                            <Grid item xs={4} md={3}>
                                                                                {data !== null && data?.length}
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                    {/* button */}
                                                                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                                                        <Button
                                                                            variant="contained"
                                                                            sx={{ fontWeight: 400, backgroundColor: '#875F9A' }}
                                                                            onClick={() => handleExport()}
                                                                        >
                                                                            Cetak
                                                                        </Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Stack>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </LocalizationProvider>
    );
};

export default report;
