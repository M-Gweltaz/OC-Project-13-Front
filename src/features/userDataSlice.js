import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userDataService from '../services/userDataService';

export const profileData = createAsyncThunk(
	'userData/profileData',
	async (user, thunkAPI) => {
		try {
			return await userDataService.profileData(user);
		} catch (error) {
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

export const updateProfileData = createAsyncThunk(
	'userData/updateProfileData',
	async (data, thunkAPI) => {
		console.log(data);
		try {
			return await userDataService.updateProfileData(data);
		} catch (error) {
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

const userDataSlice = createSlice({
	name: 'userData',
	initialState: {
		data: {
			firstName: null,
			lastName: null,
			email: null,
			status: null,
			createdAt: null,
			updatedAt: null,
		},
		updateDataForm: {
			isOpen: false,
			firstName: '',
			lastName: '',
		},
		isError: false,
		isSuccess: false,
		isLoading: false,
		message: '',
	},
	reducers: {
		toggleUpdateDataForm: (state) => {
			state.updateDataForm.isOpen = !state.updateDataForm.isOpen;
		},
		updateFields: (state, action) => {
			const { name, value } = action.payload;
			return {
				...state,
				updateDataForm: {
					...state.updateDataForm,
					[name]: value,
				},
				errorMessage: null,
			};
		},
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
		cleanData: (state) => {
			state.data = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(profileData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(profileData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = {
					firstName: action.payload.body.firstName,
					lastName: action.payload.body.lastName,
					email: action.payload.body.email,
					status: action.payload.status,
					createdAt: action.payload.body.createdAt,
					updatedAt: action.payload.body.updatedAt,
				};
			})
			.addCase(profileData.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.message = 'You need to login first to access this page';
				state.user = null;
			})
			.addCase(updateProfileData.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfileData.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.data = {
					firstName: action.payload.body.firstName,
					lastName: action.payload.body.lastName,
					status: action.payload.status,
					createdAt: action.payload.body.createdAt,
					updatedAt: action.payload.body.updatedAt,
				};
			})
			.addCase(updateProfileData.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
				state.message = 'You need to login first to access this page';
				state.user = null;
			});
	},
});

const { actions, reducer } = userDataSlice;
export const {
	toggleUpdateDataForm,
	updateFields,
	updateData,
	cleanData,
	reset,
} = actions;
export default reducer;
