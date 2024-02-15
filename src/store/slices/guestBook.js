// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from '@/utils/axios';
import { openSnackbar } from '@/store/slices/snackbar';

// ----------------------------------------------------------------------
const initialState = {
    loading: false,
    loadingGet: false,
    loadingCreate: false,
    loadingUpdate: false,
    loadingDelete: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    guestBooks: []
};

const slice = createSlice({
    name: 'guestBook',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        hasErrorCreate(state, action) {
            state.errorCreate = action.payload;
        },
        hasErrorUpdate(state, action) {
            state.errorUpdate = action.payload;
        },
        hasErrorDelete(state, action) {
            state.errorDelete = action.payload;
        },

        // GET
        getGuestBooksSuccess(state, action) {
            state.guestBooks = action.payload;
        },

        // loading
        loading(state, action) {
            state.loading = action.payload;
        },
        loadingGet(state, action) {
            state.loadingGet = action.payload;
        },
        loadingCreate(state, action) {
            state.loadingCreate = action.payload;
        },
        loadingUpdate(state, action) {
            state.loadingUpdate = action.payload;
        },
        loadingDelete(state, action) {
            state.loadingDelete = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getGuestBook(param) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.loadingGet(true));
            const response = await axios.get(`/guest-book${param || ''}`);
            dispatch(slice.actions.getGuestBooksSuccess(response?.data?.data));
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGet(false));
        } catch (error) {
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGet(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function createGuestBook(body) {
    return async () => {
        try {
            dispatch(slice.actions.hasErrorCreate(null));
            dispatch(slice.actions.loadingCreate(true));
            const res = await axios.post(`/guest-book`, body);
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.data?.message,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.hasErrorCreate(null));
            dispatch(slice.actions.loadingCreate(false));
        } catch (error) {
            dispatch(slice.actions.hasErrorCreate(error?.response?.data));
            dispatch(slice.actions.loadingCreate(false));
        }
    };
}

export function updateGuestBook(id, body) {
    return async () => {
        try {
            dispatch(slice.actions.hasErrorUpdate(null));
            dispatch(slice.actions.loadingUpdate(true));
            const res = await axios.patch(`/guest-book/${id}`, body);
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.data?.message,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.hasErrorUpdate(null));
            dispatch(slice.actions.loadingUpdate(false));
        } catch (error) {
            dispatch(slice.actions.hasErrorUpdate(error?.response?.data));
            dispatch(slice.actions.loadingUpdate(false));
        }
    };
}

export function deleteGuestBook(id) {
    return async () => {
        try {
            dispatch(slice.actions.hasErrorDelete(null));
            dispatch(slice.actions.loadingDelete(true));
            const res = await axios.delete(`/guest-book/${id}`);
            dispatch(
                openSnackbar({
                    open: true,
                    message: res?.data?.message,
                    variant: 'alert',
                    alert: {
                        color: 'success'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.hasErrorDelete(null));
            dispatch(slice.actions.loadingDelete(false));
        } catch (error) {
            dispatch(slice.actions.hasErrorDelete(error?.response?.data));
            dispatch(
                openSnackbar({
                    open: true,
                    message: `Error: ${error?.response?.status} - ${error.response?.data?.message || 'Gagal menghapus data'} `,
                    variant: 'alert',
                    alert: {
                        color: 'error'
                    },
                    close: true
                })
            );
            dispatch(slice.actions.loadingDelete(false));
        }
    };
}
