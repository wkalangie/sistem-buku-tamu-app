// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from '@/utils/axios';

// ----------------------------------------------------------------------
const initialState = {
    loading: false,
    loadingGet: false,
    error: null,
    errorCreate: null,
    errorUpdate: null,
    errorDelete: null,
    reports: []
};

const slice = createSlice({
    name: 'report',
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
        getReportSuccess(state, action) {
            state.reports = action.payload;
        },

        // loading
        loading(state, action) {
            state.loading = action.payload;
        },
        loadingGet(state, action) {
            state.loadingGet = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getReport(param) {
    return async () => {
        try {
            dispatch(slice.actions.loading(true));
            dispatch(slice.actions.loadingGet(true));
            const response = await axios.get(`/report${param || ''}`);
            dispatch(slice.actions.getReportSuccess(response?.data?.data));
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGet(false));
        } catch (error) {
            dispatch(slice.actions.loading(false));
            dispatch(slice.actions.loadingGet(false));
            dispatch(slice.actions.hasError(error));
        }
    };
}
