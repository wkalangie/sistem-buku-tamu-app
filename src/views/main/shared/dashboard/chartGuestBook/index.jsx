/* eslint-disable react/prop-types */
/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/system';
import { Stack, Typography, Select, MenuItem, FormControl, CircularProgress } from '@mui/material';

// project imports
import { useDispatch, useSelector } from '@/store';
import { getChartGuestBook } from '@/store/slices/summary';

// third party
import ReactApexChart from 'react-apexcharts';

const chartGuestBook = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // data
    const [reportTaskYear, setReportTaskYear] = useState('');
    const [seriesData, setSeriesData] = useState([]);
    const { loadingGuestBook, chartGuestBook } = useSelector((state) => state.summary);

    useEffect(() => {
        dispatch(getChartGuestBook(`?year=${reportTaskYear}`));
    }, [reportTaskYear]);

    // chart
    const [loadingArr, setLoadingArr] = useState(false);
    const date = new Date();
    const thisYear = date.getFullYear();
    const [year, setYear] = useState(thisYear);

    const handleChangeYear = (event) => {
        setYear(event.target.value);
    };

    useEffect(() => {
        setReportTaskYear(year);
    }, [year]);

    useEffect(() => {
        const arrSeries = [];
        setLoadingArr(true);
        chartGuestBook?.forEach((item) => {
            arrSeries.push(item?.total_report);
        });
        if (arrSeries?.length === chartGuestBook?.length) {
            setSeriesData(arrSeries);
            setLoadingArr(false);
        }
    }, [chartGuestBook]);

    const chart = {
        series: [
            {
                name: 'Report Task',
                data: seriesData
            }
        ],
        options: {
            chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                    show: false
                }
            },
            yaxis: [
                {
                    labels: {
                        formatter: function (val) {
                            return val.toFixed(0);
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '40%',
                    borderRadius: 5,
                    endingShape: 'rounded'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'vertical',
                    shadeIntensity: 0.5,
                    gradientToColors: undefined,
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 0.6,
                    stops: [0, 100],
                    colorStops: []
                }
            }
        }
    };

    // year
    const yearAgo = new Date().getFullYear() - 5;
    const yearPast = new Date().getFullYear();
    const yearsAgo = Array.from(new Array(5), (val, index) => index + yearAgo);
    const yearsPast = Array.from(new Array(5), (val, index) => index + yearPast);

    const listYear = [...yearsAgo, ...yearsPast];

    return (
        <Stack gap={2} sx={{ backgroundColor: theme.palette.secondary[10], p: 2, borderRadius: 2 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" pr={1}>
                <Typography variant="h3">Statistik Kunjungan</Typography>
                <FormControl
                    variant="standard"
                    sx={{
                        '& .MuiInput-root': {
                            '&:before, :after, :hover:not(.Mui-disabled):before': {
                                borderBottom: 0
                            }
                        }
                    }}
                >
                    <Select
                        value={year}
                        onChange={handleChangeYear}
                        style={{ fontSize: '1.5rem' }}
                        inputProps={{
                            MenuProps: {
                                sx: {
                                    '&& .Mui-selected': {
                                        backgroundColor: theme.palette.primary[20],
                                        color: theme.palette.primary[100]
                                    }
                                },
                                MenuListProps: {
                                    sx: {
                                        backgroundColor: theme.palette.secondary.main,
                                        width: 100
                                    }
                                }
                            }
                        }}
                    >
                        {listYear?.map((item, key) => (
                            <MenuItem
                                value={item}
                                key={key}
                                sx={{
                                    justifyContent: 'center',
                                    mt: 1,
                                    borderRadius: 20,
                                    '&:hover': {
                                        backgroundColor: theme.palette.primary[10],
                                        color: theme.palette.primary[100]
                                    }
                                }}
                            >
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
            {loadingGuestBook || loadingArr ? (
                <Stack direction="row" alignItems="center" justifyContent="center" py={2}>
                    <CircularProgress />
                </Stack>
            ) : (
                <ReactApexChart options={chart.options} series={chart.series} type="bar" width="100%" height={300} />
            )}
        </Stack>
    );
};

export default chartGuestBook;
