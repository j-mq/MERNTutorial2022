import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Get user from localStorage
const getUserFromLocalStorage = (): string | null => {
  const localStorageUser = localStorage.getItem('user');
  if (localStorageUser) {
    return JSON.parse(localStorageUser);
  }
  return null;
};

const initialState = {
  user: getUserFromLocalStorage(),
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: () => {},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
