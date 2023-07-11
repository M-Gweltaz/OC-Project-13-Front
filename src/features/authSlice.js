import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../services/authService';

// get user from localStorage
let user = JSON.parse(localStorage.getItem('user'));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: '',
};

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response && error.response.data && error.response.data.message) ||
			error.message ||
			error.toString();
		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await authService.logout();
});

const authSlice = createSlice({
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
	extraReducers: (builder) => {
		builder
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				console.log(action.payload.body.token);
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload.body.token;
			})
			.addCase(login.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.message = 'Username or password is incorrect';
				state.user = null;
			});
	},
});

const { actions, reducer } = authSlice;
export const { reset } = actions;
export default reducer;
