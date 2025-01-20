import { createSlice } from '@reduxjs/toolkit';
import { getCampers, getCamperById, getLocations } from './api';

const initialState = {
  filters: {},
  uniqueLocations: [],
  total: 0,
  items: [],
  favoriteVehicles: [],
  currentCamper: null,
  loading: false,
  error: null,
  page: 1,
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    clearCampers: state => {
      state.items = [];
      state.total = 0;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
      console.log(action.payload);
    },    
    resetPage: state => {
      state.page = 1;
      console.log(state.page);
    },
    toggleFavorite: (state, action) => {
      const index = state.favoriteVehicles.indexOf(action.payload);
      if (index < 0) {
        state.favoriteVehicles.push(action.payload);
      } else {
        state.favoriteVehicles.splice(index, 1);
      }
    }    
  },
  extraReducers: builder =>
    builder
      .addCase(getCampers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCampers.fulfilled, (state, action) => {
        const { items, total } = action.payload;
        state.loading = false;
        state.total = total;
        const uniqueItems = items.filter(
          item => !state.items.some(existingItem => existingItem.id === item.id)
        );
        state.items = [...state.items, ...uniqueItems];
      })
      .addCase(getCamperById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCamperById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCamper = action.payload;
      })
      .addCase(getLocations.pending, state => {
        state.error = null;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        const uniqueLocations = [
          ...new Set(action.payload.map(item => item.location)),
        ];
        state.uniqueLocations = uniqueLocations;
      })
      .addCase(getCampers.rejected, handleRejected)
      .addCase(getCamperById.rejected, handleRejected)
      .addCase(getLocations.rejected, handleRejected)
});

export const {
  setFilters,
  clearCampers,
  setPage,
  toggleFavorite,
  setLocations,
  resetPage,
} = campersSlice.actions;
export const campersReducer = campersSlice.reducer;
