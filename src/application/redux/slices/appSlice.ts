import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {ApiStatus} from '../../../domain/enums/apiStatus';

interface AppState {
  isLoggedIn: boolean;
  isLoading: ApiStatus;
}

const initialState: AppState = {
  isLoggedIn: false,
  isLoading: ApiStatus.IDLE,
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    fetchIsLoggedIn(state, action: PayloadAction<undefined>) {
      state.isLoading = ApiStatus.LOADING;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoading = ApiStatus.SUCCESS;
      state.isLoggedIn = action.payload;
    },
  },
});

export const selectAppSlice = (state: {appSlice: any}): AppState =>
  state.appSlice;
export const {fetchIsLoggedIn, setIsLoggedIn} = appSlice.actions;
export default appSlice.reducer;
