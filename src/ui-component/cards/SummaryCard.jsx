// material-ui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, CircularProgress, Box } from '@mui/material';

// project imports
import MainCard from '@/ui-component/cards/MainCard';

const SummaryCard = ({ title, value, loading, icon }) => {
    const theme = useTheme();

    return (
        <MainCard sx={{ width: '100%', backgroundColor: theme.palette.primary[90], color: theme.palette.secondary.main }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack gap={2} justifyContent="space-between">
                    <Typography variant="h3" sx={{ color: theme.palette.secondary.main, fontWeight: 200 }}>
                        {title}
                    </Typography>
                    {loading ? (
                        <CircularProgress sx={{ color: theme.palette.secondary.main }} />
                    ) : (
                        <Typography variant="h1" sx={{ color: theme.palette.secondary.main }}>
                            {value || 0}
                        </Typography>
                    )}
                </Stack>
                <Box component="img" src={icon || null} width={100} height={100} />
            </Stack>
        </MainCard>
    );
};

export default SummaryCard;
