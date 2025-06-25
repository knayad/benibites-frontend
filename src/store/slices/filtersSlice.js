import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  location: '',
  cuisine: '',
  benefits: [],
  rating: null,
  priceRange: null,
  sortBy: 'rating', // 'rating', 'distance', 'name', 'reviews'
  viewMode: 'grid', // 'grid', 'list'
  appliedFilters: {},
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCuisine: (state, action) => {
      state.cuisine = action.payload;
    },
    setBenefits: (state, action) => {
      state.benefits = action.payload;
    },
    toggleBenefit: (state, action) => {
      const benefit = action.payload;
      const index = state.benefits.indexOf(benefit);
      if (index > -1) {
        state.benefits.splice(index, 1);
      } else {
        state.benefits.push(benefit);
      }
    },
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
    applyFilters: (state) => {
      state.appliedFilters = {
        searchQuery: state.searchQuery,
        location: state.location,
        cuisine: state.cuisine,
        benefits: state.benefits,
        rating: state.rating,
        priceRange: state.priceRange,
        sortBy: state.sortBy,
      };
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.location = '';
      state.cuisine = '';
      state.benefits = [];
      state.rating = null;
      state.priceRange = null;
      state.sortBy = 'rating';
      state.appliedFilters = {};
    },
  },
});

export const {
  setSearchQuery,
  setLocation,
  setCuisine,
  setBenefits,
  toggleBenefit,
  setRating,
  setPriceRange,
  setSortBy,
  setViewMode,
  applyFilters,
  clearFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer; 