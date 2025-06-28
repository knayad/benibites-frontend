import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Async thunks
export const fetchReviews = createAsyncThunk(
    'reviews/fetchReviews',
    async (restaurantId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/reviews/business/${restaurantId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch reviews');
        }
    }
);

export const fetchUserReviews = createAsyncThunk(
    'reviews/fetchUserReviews',
    async (_, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.get(`${API_BASE_URL}/reviews/user`, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch user reviews');
        }
    }
);

export const createReview = createAsyncThunk(
    'reviews/createReview',
    async (reviewData, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}/reviews`, reviewData, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to create review');
        }
    }
);

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async ({ id, data }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.put(`${API_BASE_URL}/reviews/${id}`, data, config);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to update review');
        }
    }
);

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (id, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            await axios.delete(`${API_BASE_URL}/reviews/${id}`, config);
            return id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to delete review');
        }
    }
);

export const voteReview = createAsyncThunk(
    'reviews/voteReview',
    async ({ reviewId, voteType }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}/reviews/${reviewId}/vote`, 
                { voteType }, config);
            return { reviewId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to vote on review');
        }
    }
);

export const reportReview = createAsyncThunk(
    'reviews/reportReview',
    async ({ reviewId, reason }, { rejectWithValue, getState }) => {
        try {
            const { auth } = getState();
            const config = {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}/reviews/${reviewId}/report`, 
                { reason }, config);
            return { reviewId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to report review');
        }
    }
);

const initialState = {
    reviews: [],
    userReviews: [],
    loading: false,
    error: null,
    submitting: false,
    submitError: null
};

const reviewsSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
            state.submitError = null;
        },
        clearReviews: (state) => {
            state.reviews = [];
        },
        setReviewForm: (state, action) => {
            state.reviewForm = { ...state.reviewForm, ...action.payload };
        },
        resetReviewForm: (state) => {
            state.reviewForm = {
                foodRating: 0,
                benefitsRating: 0,
                staffBenefitsRating: 0,
                workEnvironmentRating: 0,
                managementRating: 0,
                ownerRating: 0,
                title: '',
                content: ''
            };
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch reviews
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Fetch user reviews
            .addCase(fetchUserReviews.fulfilled, (state, action) => {
                state.userReviews = action.payload;
            })
            
            // Create review
            .addCase(createReview.pending, (state) => {
                state.submitting = true;
                state.submitError = null;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.submitting = false;
                state.reviews.unshift(action.payload);
                // Reset form
                state.reviewForm = {
                    foodRating: 0,
                    benefitsRating: 0,
                    staffBenefitsRating: 0,
                    workEnvironmentRating: 0,
                    managementRating: 0,
                    ownerRating: 0,
                    title: '',
                    content: ''
                };
            })
            .addCase(createReview.rejected, (state, action) => {
                state.submitting = false;
                state.submitError = action.payload;
            })
            
            // Update review
            .addCase(updateReview.pending, (state) => {
                state.submitting = true;
                state.submitError = null;
            })
            .addCase(updateReview.fulfilled, (state, action) => {
                state.submitting = false;
                const index = state.reviews.findIndex(r => r._id === action.payload._id);
                if (index !== -1) {
                    state.reviews[index] = action.payload;
                }
            })
            .addCase(updateReview.rejected, (state, action) => {
                state.submitting = false;
                state.submitError = action.payload;
            })
            
            // Delete review
            .addCase(deleteReview.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteReview.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = state.reviews.filter(r => r._id !== action.payload);
            })
            .addCase(deleteReview.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Vote review
            .addCase(voteReview.fulfilled, (state, action) => {
                const review = state.reviews.find(r => r._id === action.payload.reviewId);
                if (review) {
                    review.helpfulVotes = action.payload.helpfulVotes;
                }
            })
            
            // Report review
            .addCase(reportReview.fulfilled, (state, action) => {
                // Handle successful report (maybe show a notification)
                console.log('Review reported successfully');
            });
    }
});

export const { 
    clearError, 
    clearReviews, 
    setReviewForm, 
    resetReviewForm 
} = reviewsSlice.actions;

// Selectors
export const selectAllReviews = (state) => state.reviews.reviews;
export const selectUserReviews = (state) => state.reviews.userReviews;
export const selectReviewsLoading = (state) => state.reviews.loading;
export const selectReviewsError = (state) => state.reviews.error;
export const selectReviewSubmitting = (state) => state.reviews.submitting;
export const selectReviewSubmitError = (state) => state.reviews.submitError;
export const selectReviewForm = (state) => state.reviews.reviewForm;

export default reviewsSlice.reducer; 