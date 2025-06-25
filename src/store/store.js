import { configureStore } from '@reduxjs/toolkit';
import restaurantsReducer from './slices/restaurantsSlice';
import reviewsReducer from './slices/reviewsSlice';
import authReducer from './slices/authSlice';
import filtersReducer from './slices/filtersSlice';

export const store = configureStore({
  reducer: {
    restaurants: restaurantsReducer,
    reviews: reviewsReducer,
    auth: authReducer,
    filters: filtersReducer,
  },
}); 