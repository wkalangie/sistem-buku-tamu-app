import { useEffect } from 'react';

// material-ui
import { Grid, Stack } from '@mui/material';

// api
import { useDispatch, useSelector } from '@/store';
import { getSummaryGlobal } from '@/store/slices/summary';

//  project imports
import ChartGuestBook from '@/views/main/shared/dashboard/chartGuestBook';
import SummaryCard from '@/ui-component/cards/SummaryCard';

// assets
import IcTotalVisit from '@/assets/images/component/ic_total_visit.svg';

const Dashboard = () => {
    const dispatch = useDispatch();

    const { loadingGetGlobal, summaryGlobal } = useSelector((state) => state.summary);

    useEffect(() => {
        dispatch(getSummaryGlobal());
    }, [dispatch]);
    return (
        <Grid container>
            {/* summary */}
            <Grid item xs={12}>
                <Stack direction={{ md: 'row' }} alignItems="center" justifyContent="space-between" gap={2}>
                    <SummaryCard
                        title="Total Kunjungan"
                        value={summaryGlobal?.total_guest_book}
                        icon={IcTotalVisit}
                        loading={loadingGetGlobal}
                    />
                </Stack>
            </Grid>

            {/* chart */}
            <Grid item xs={12}>
                <ChartGuestBook />
            </Grid>
        </Grid>
    );
};

export default Dashboard;
