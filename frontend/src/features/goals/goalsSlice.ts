import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LocalStorageUser } from '../auth/authSlice';
import goalsService, { Goal } from './goalsService';

const initialState = {
  goals: [] as Goal[],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Create new goal
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData: { text: string }, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as {
        auth: { user: LocalStorageUser };
      };
      return await goalsService.createGoal(goalData, auth.user.token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user goals
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as {
        auth: { user: LocalStorageUser };
      };
      return await goalsService.getGoals(auth.user.token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (goalId: string, thunkAPI) => {
    try {
      const { auth } = thunkAPI.getState() as {
        auth: { user: LocalStorageUser };
      };
      return await goalsService.deleteGoal(goalId, auth.user.token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
