import { useState, useEffect } from 'react';

// material ui
import { useTheme } from '@mui/system';
import {
    Grid,
    Stack,
    Button,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TablePagination,
    TableCell,
    IconButton,
    MenuItem,
    CircularProgress,
    OutlinedInput,
    InputAdornment
} from '@mui/material';

// api
import { useDispatch, useSelector } from '@/store';
import { getGuestBook, deleteGuestBook } from '@/store/slices/guestBook';
import { getSummaryGlobal } from '@/store/slices/summary';

// project imports
import SummaryCard from '@/ui-component/cards/SummaryCard';
import MainCard from '@/ui-component/cards/MainCard';
import EnhancedTableHead from '@/ui-component/extended/EnhancedTableHead';
import { getComparator, stableSort, handleSearch, handleRequestSort } from '@/utils/tableHelper';
import EnhancedMenu from '@/ui-component/extended/EnhancedMenu';
import AlertDialog from '@/ui-component/extended/AlertDialog';
import AddGuestBook from './forms/AddGuestBook';
import EditGuestBook from './forms/EditGuestBook';
import DetailGuestBook from './DetailGuestBook';

// assets
import IcTotalVisit from '@/assets/images/component/ic_total_visit.svg';
import { IconBrowserPlus, IconTrash, IconDots, IconEdit, IconEye, IconSearch } from '@tabler/icons-react';

// third-party
import moment from 'moment';
import 'moment/dist/locale/id';
moment.locale('id');

// Table Header
const headCells = [
    {
        id: 'no',
        numeric: false,
        label: 'No.',
        align: 'center',
        flex: 2
    },
    {
        id: 'instance',
        numeric: false,
        label: 'Instansi',
        align: 'center',
        sortable: false
    },
    {
        id: 'full_name',
        numeric: false,
        label: 'Nama',
        align: 'center',
        sortable: false,
        flex: 1
    },
    {
        id: 'created',
        numeric: false,
        label: 'Waktu Kunjungan',
        align: 'center',
        sortable: false,
        flex: 1
    },
    {
        id: 'action',
        numeric: false,
        label: 'Aksi',
        align: 'center',
        sortable: false
    }
];

const guestBook = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // action dialog
    const [openAdd, setOpenAdd] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDetail, setOpenDetail] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    // table
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('none');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([]);

    const { guestBooks, loadingGet, errorDelete, loadingDelete } = useSelector((state) => state.guestBook);
    const { loadingGetGlobal, summaryGlobal } = useSelector((state) => state.summary);

    useEffect(() => {
        dispatch(getSummaryGlobal());
        dispatch(getGuestBook());
    }, [dispatch]);

    useEffect(() => {
        setRows(guestBooks);
    }, [guestBooks]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };

    // search state
    const [search, setSearch] = useState('');
    useEffect(() => {
        handleSearch(search, setPage, ['id', 'instance', 'full_name', 'email', 'phone'], rows, setRows, guestBooks);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // Action  button
    const [anchorEl2, setAnchorEl2] = useState(null);
    const openAction = Boolean(anchorEl2);
    const [selectedData, setSelectedData] = useState([]);
    const handleClickAction = (event, row) => {
        setAnchorEl2(event.currentTarget);
        setSelectedData(row);
    };
    const handleCloseAction = () => {
        setAnchorEl2(null);
        setSelectedData([]);
    };

    useEffect(() => {
        if (!errorDelete && !loadingDelete) {
            dispatch(getGuestBook());
            setOpenDeleteDialog(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errorDelete, !loadingDelete]);

    return (
        <>
            <Grid container gap={2}>
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

                {/* table */}
                <Grid item xs={12}>
                    <MainCard>
                        <Stack gap={2}>
                            <Stack direction="row" justifyContent="space-between">
                                <Typography variant="h2">Buku Tamu</Typography>
                                <OutlinedInput
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{ maxWidth: 300 }}
                                    size="small"
                                    placeholder="Cari"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            {search ? (
                                                <IconButton color="error" onClick={() => setSearch('')}>
                                                    <IconTrash stroke={2} size="20px" />
                                                </IconButton>
                                            ) : (
                                                <IconSearch stroke={2} size="20px" />
                                            )}
                                        </InputAdornment>
                                    }
                                />
                                <Button
                                    size="medium"
                                    variant="contained"
                                    endIcon={<IconBrowserPlus />}
                                    sx={{ width: 'fit-content', px: 3 }}
                                    onClick={() => setOpenAdd(true)}
                                >
                                    Tambah Kunjungan
                                </Button>
                            </Stack>

                            {/* table */}
                            <TableContainer>
                                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                                    <EnhancedTableHead
                                        headCells={headCells}
                                        order={order}
                                        orderBy={orderBy}
                                        onRequestSort={(e, property) =>
                                            handleRequestSort(e, property, order, setOrder, orderBy, setOrderBy)
                                        }
                                        rowCount={rows.length}
                                    />

                                    <TableBody>
                                        {!loadingGet &&
                                            stableSort(rows, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    /** Make sure no display bugs if row isn't an OrderData object */
                                                    if (typeof row === 'number') return null;

                                                    return (
                                                        <TableRow hover key={index}>
                                                            <TableCell align="center" component="th" scope="row">
                                                                <>{page * rowsPerPage + index + 1}.</>
                                                            </TableCell>
                                                            <TableCell align="center">{row?.instance}</TableCell>
                                                            <TableCell align="center">{row?.full_name}</TableCell>
                                                            <TableCell align="center">
                                                                Jam {moment(row?.created).format('hh:ss A, DD MMMM YYYY')}
                                                            </TableCell>
                                                            <TableCell align="center">
                                                                <IconButton
                                                                    size="large"
                                                                    id="demo-customized-button"
                                                                    aria-controls={openAction ? 'demo-customized-menu' : undefined}
                                                                    aria-haspopup="true"
                                                                    aria-expanded={openAction ? 'true' : undefined}
                                                                    // disableElevation
                                                                    onClick={(e) => handleClickAction(e, row)}
                                                                >
                                                                    <IconDots style={{ fontSize: '1.3rem' }} />
                                                                </IconButton>
                                                                <EnhancedMenu
                                                                    id="demo-customized-menu"
                                                                    MenuListProps={{
                                                                        'aria-labelledby': 'demo-customized-button'
                                                                    }}
                                                                    anchorEl={anchorEl2}
                                                                    open={openAction}
                                                                    onClose={handleCloseAction}
                                                                >
                                                                    <MenuItem
                                                                        onClick={() => {
                                                                            setAnchorEl2(null);
                                                                            setOpenDetail(true);
                                                                        }}
                                                                        disableRipple
                                                                    >
                                                                        <IconEye
                                                                            color={theme.palette.info.main}
                                                                            stroke={1.5}
                                                                            style={{ marginRight: 5 }}
                                                                        />
                                                                        Lihat Data Kunjungan
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() => {
                                                                            setAnchorEl2(null);
                                                                            setOpenEdit(true);
                                                                        }}
                                                                        disableRipple
                                                                    >
                                                                        <IconEdit
                                                                            color={theme.palette.info.main}
                                                                            stroke={1.5}
                                                                            style={{ marginRight: 5 }}
                                                                        />
                                                                        Ubah Data Kunjungan
                                                                    </MenuItem>
                                                                    <MenuItem
                                                                        onClick={() => {
                                                                            setAnchorEl2(null);
                                                                            setOpenDeleteDialog(true);
                                                                        }}
                                                                        disableRipple
                                                                    >
                                                                        <IconTrash
                                                                            color={theme.palette.error.main}
                                                                            stroke={1.5}
                                                                            style={{ marginRight: 5 }}
                                                                        />
                                                                        Hapus Data Kunjungan
                                                                    </MenuItem>
                                                                </EnhancedMenu>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        {loadingGet ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    <CircularProgress />
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            rows.length === 0 &&
                                            !loadingGet && (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        <Typography variant="subtitle2">Tidak ada data tersedia</Typography>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {/* table pagination */}
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Stack>
                    </MainCard>
                </Grid>
            </Grid>

            {/* dialog */}
            {/* add */}
            <Dialog open={openAdd} fullWidth maxWidth="md" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Tambah Data Kunjungan</DialogTitle>
                <DialogContent>
                    <AddGuestBook onClose={() => setOpenAdd(false)} />
                </DialogContent>
            </Dialog>

            {/* edit */}
            <Dialog
                open={openEdit}
                fullWidth
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Ubah Data Kunjungan</DialogTitle>
                <DialogContent>
                    <EditGuestBook
                        data={selectedData}
                        onClose={() => {
                            setOpenEdit(false);
                            setSelectedData([]);
                        }}
                    />
                </DialogContent>
            </Dialog>

            {/* detail */}
            <Dialog
                open={openDetail}
                fullWidth
                maxWidth="md"
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Detail Data Kunjungan</DialogTitle>
                <DialogContent>
                    <DetailGuestBook
                        data={selectedData}
                        onClose={() => {
                            setOpenDetail(false);
                            setSelectedData([]);
                        }}
                    />
                </DialogContent>
            </Dialog>

            {openDeleteDialog && (
                <AlertDialog
                    loading={loadingDelete}
                    open={openDeleteDialog}
                    onClose={() => setOpenDeleteDialog(false)}
                    onConfirm={async () => {
                        await dispatch(deleteGuestBook(selectedData?.id));
                        await dispatch(getSummaryGlobal());
                    }}
                >
                    <Typography>Anda yakin ingin menghapus data ini?</Typography>
                </AlertDialog>
            )}
        </>
    );
};

export default guestBook;
