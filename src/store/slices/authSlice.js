import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to set auth token in axios headers
const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('token');
    }
};

// Load token from localStorage on app start
const token = localStorage.getItem('token');
if (token) {
    setAuthToken(token);
}

// Async thunks
export const register = createAsyncThunk(
    'auth/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
            const { token, user } = response.data;
            setAuthToken(token);
            return { token, user };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Registration failed');
        }
    }
);

export const registerBusiness = createAsyncThunk(
    'auth/registerBusiness',
    async (businessData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/register-business`, businessData);
            const { token, user } = response.data;
            setAuthToken(token);
            return { token, user };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Business registration failed');
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
            const { token, user } = response.data;
            setAuthToken(token);
            return { token, user };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Login failed');
        }
    }
);

export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/auth/me`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to load user');
        }
    }
);

export const updateProfile = createAsyncThunk(
    'auth/updateProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/profile`, profileData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update profile');
        }
    }
);

export const changePassword = createAsyncThunk(
    'auth/changePassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/auth/change-password`, passwordData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to change password');
        }
    }
);

export const verifyEmployee = createAsyncThunk(
    'auth/verifyEmployee',
    async (verificationData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/verify-employee`, verificationData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to verify employee status');
        }
    }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await axios.post(`${API_BASE_URL}/auth/logout`);
            setAuthToken(null);
            return null;
        } catch (error) {
            // Even if logout fails on server, clear local token
            setAuthToken(null);
            return rejectWithValue(error.response?.data?.error || 'Logout failed');
        }
    }
);

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
    profileLoading: false,
    profileError: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.profileError = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Register Business
            .addCase(registerBusiness.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerBusiness.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(registerBusiness.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.token = action.payload.token;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Load user
            .addCase(loadUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.loading = false;
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.loading = false;
                state.isAuthenticated = false;
                state.token = null;
                state.user = null;
                setAuthToken(null);
            })
            
            // Update profile
            .addCase(updateProfile.pending, (state) => {
                state.profileLoading = true;
                state.profileError = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.user = { ...state.user, ...action.payload.user };
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileError = action.payload;
            })
            
            // Change password
            .addCase(changePassword.pending, (state) => {
                state.profileLoading = true;
                state.profileError = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.profileLoading = false;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileError = action.payload;
            })
            
            // Verify employee
            .addCase(verifyEmployee.pending, (state) => {
                state.profileLoading = true;
                state.profileError = null;
            })
            .addCase(verifyEmployee.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.user = { ...state.user, ...action.payload };
            })
            .addCase(verifyEmployee.rejected, (state, action) => {
                state.profileLoading = false;
                state.profileError = action.payload;
            })
            
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            })
            .addCase(logout.rejected, (state) => {
                state.token = null;
                state.user = null;
                state.isAuthenticated = false;
                state.loading = false;
            });
    }
});

export const { clearError, setLoading } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectProfileLoading = (state) => state.auth.profileLoading;
export const selectProfileError = (state) => state.auth.profileError;
export const selectUserRoles = (state) => state.auth.user?.roles || [];
export const selectIsEmployee = (state) => state.auth.user?.roles?.includes('employee') || false;
export const selectIsBusiness = (state) => state.auth.user?.roles?.includes('business') || false;
export const selectIsAdmin = (state) => state.auth.user?.roles?.includes('admin') || false;

export default authSlice.reducer; 