// third-party
import { combineReducers } from 'redux';

// reducer
import guestBookReducer from './slices/guestBook';
import menuReducer from './slices/menu';
import reportReducer from './slices/report';
import snackbarReducer from './slices/snackbar';
import summaryReducer from './slices/summary';
import userReducer from './slices/user';

const reducer = combineReducers({
    guestBook: guestBookReducer,
    menu: menuReducer,
    report: reportReducer,
    snackbar: snackbarReducer,
    summary: summaryReducer,
    user: userReducer
});

export default reducer;
