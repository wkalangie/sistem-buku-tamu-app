// material-ui
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';

// project import
import { drawerWidth } from '@/store/constant';

const openedMixin = (theme) => ({
    width: drawerWidth,
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.primary.main,
    paddingTop: 75,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen + 200
    }),
    overflowX: 'hidden',
    boxShadow: 'none'
});

const closedMixin = (theme) => ({
    borderRight: 'none',
    zIndex: 1099,
    background: theme.palette.primary.main,
    paddingTop: 75,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen + 200
    }),
    overflowX: 'hidden',
    width: 72
});

// ==============================|| DRAWER - MINI STYLED ||============================== //

const MiniDrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    borderRight: '0px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme)
    })
}));

export default MiniDrawerStyled;
