import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchRestaurants = createAsyncThunk(
    'restaurants/fetchRestaurants',
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurants`, { params });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch restaurants');
        }
    }
);

export const searchRestaurants = createAsyncThunk(
    'restaurants/searchRestaurants',
    async (searchParams, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurants/search`, { 
                params: searchParams 
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to search restaurants');
        }
    }
);

export const fetchRestaurantById = createAsyncThunk(
    'restaurants/fetchRestaurantById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurants/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch restaurant');
        }
    }
);

export const createRestaurant = createAsyncThunk(
    'restaurants/createRestaurant',
    async (restaurantData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}/restaurants`, restaurantData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create restaurant');
        }
    }
);

export const updateRestaurant = createAsyncThunk(
    'restaurants/updateRestaurant',
    async ({ id, data }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.put(`${API_BASE_URL}/restaurants/${id}`, data, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update restaurant');
        }
    }
);

export const fetchRestaurantBenefits = createAsyncThunk(
    'restaurants/fetchRestaurantBenefits',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/benefits`);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch restaurant benefits');
        }
    }
);

export const updateRestaurantBenefits = createAsyncThunk(
    'restaurants/updateRestaurantBenefits',
    async ({ id, benefits }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.put(`${API_BASE_URL}/restaurants/${id}/benefits`, benefits, config);
            return { id, benefits: response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update restaurant benefits');
        }
    }
);

export const fetchRestaurantStats = createAsyncThunk(
    'restaurants/fetchRestaurantStats',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/restaurants/${id}/stats`);
            return { id, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch restaurant stats');
        }
    }
);

const initialState = {
    restaurants: [],
    currentRestaurant: null,
    restaurantBenefits: {},
    restaurantStats: {},
    loading: false,
    error: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalRestaurants: 0
    },
    searchResults: [],
    searchLoading: false,
    searchError: null
};

const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.searchError = null;
        },
        clearCurrentRestaurant: (state) => {
            state.currentRestaurant = null;
        },
        clearSearchResults: (state) => {
            state.searchResults = [];
        },
        setRestaurantFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch restaurants
            .addCase(fetchRestaurants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants = action.payload.restaurants;
                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    totalRestaurants: action.payload.totalRestaurants
                };
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Search restaurants
            .addCase(searchRestaurants.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(searchRestaurants.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchRestaurants.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.payload;
            })
            
            // Fetch restaurant by ID
            .addCase(fetchRestaurantById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchRestaurantById.fulfilled, (state, action) => {
                state.loading = false;
                state.currentRestaurant = action.payload;
            })
            .addCase(fetchRestaurantById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create restaurant
            .addCase(createRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                state.restaurants.unshift(action.payload);
            })
            .addCase(createRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Update restaurant
            .addCase(updateRestaurant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.restaurants.findIndex(r => r._id === action.payload._id);
                if (index !== -1) {
                    state.restaurants[index] = action.payload;
                }
                if (state.currentRestaurant && state.currentRestaurant._id === action.payload._id) {
                    state.currentRestaurant = action.payload;
                }
            })
            .addCase(updateRestaurant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch restaurant benefits
            .addCase(fetchRestaurantBenefits.fulfilled, (state, action) => {
                state.restaurantBenefits[action.payload.id] = {
                    benefits: action.payload.benefits,
                    ratings: action.payload.ratings
                };
            })
            
            // Update restaurant benefits
            .addCase(updateRestaurantBenefits.fulfilled, (state, action) => {
                state.restaurantBenefits[action.payload.id] = {
                    ...state.restaurantBenefits[action.payload.id],
                    benefits: action.payload.benefits
                };
            })
            
            // Fetch restaurant stats
            .addCase(fetchRestaurantStats.fulfilled, (state, action) => {
                state.restaurantStats[action.payload.id] = {
                    averageFoodRating: action.payload.averageFoodRating,
                    averageBenefitsRating: action.payload.averageBenefitsRating,
                    totalReviews: action.payload.totalReviews,
                    validatedEmployeeRatings: action.payload.validatedEmployeeRatings
                };
            });
    }
});

export const { 
    clearError, 
    clearCurrentRestaurant, 
    clearSearchResults, 
    setRestaurantFilters 
} = restaurantsSlice.actions;

// Selectors
export const selectAllRestaurants = (state) => state.restaurants.restaurants;
export const selectCurrentRestaurant = (state) => state.restaurants.currentRestaurant;
export const selectRestaurantBenefits = (state, id) => state.restaurants.restaurantBenefits[id];
export const selectRestaurantStats = (state, id) => state.restaurants.restaurantStats[id];
export const selectRestaurantsLoading = (state) => state.restaurants.loading;
export const selectRestaurantsError = (state) => state.restaurants.error;
export const selectRestaurantsPagination = (state) => state.restaurants.pagination;
export const selectSearchResults = (state) => state.restaurants.searchResults;
export const selectSearchLoading = (state) => state.restaurants.searchLoading;
export const selectSearchError = (state) => state.restaurants.searchError;

export default restaurantsSlice.reducer; 