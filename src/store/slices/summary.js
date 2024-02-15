// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from '@/utils/axios';

// ----------------------------------------------------------------------
const initialState = {
    loading: false,
    loadingGetGlobal: false,
    loadingGuestBook: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    summaryGlobal: [],
    chartGuestBook: []
};

const slice = createSlice({
    name: 'summary',
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
        getSummaryGlobalSuccess(state, action) {
            state.summaryGlobal = action.payload;
        },
        getSummaryChartGuestBookSuccess(state, action) {
            state.chartGuestBook = action.payload;
        },

        // loading
        loading(state, action) {
            state.loading = action.payload;
        },
        loadingGetGlobal(state, action) {
            state.loadingGetGlobal = action.payload;
        },
        loadingGuestBook(state, action) {
            state.loadingGuestBook = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getSummaryGlobal(param) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.loadingGetGlobal(true));
            const response = await axios.get(`/summary${param || ''}`);
            dispatch(slice.actions.getSummaryGlobalSuccess(response?.data?.data));
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGetGlobal(false));
        } catch (error) {
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGetGlobal(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getChartGuestBook(param) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.loadingGuestBook(true));
            const response = await axios.get(`/summary/chart-guest-book${param || ''}`);
            dispatch(slice.actions.getSummaryChartGuestBookSuccess(response?.data?.data));
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGuestBook(false));
        } catch (error) {
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGuestBook(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}
