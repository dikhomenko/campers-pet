import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

const ENDPOINTS = {
  CAMPERS: '/campers',
  CAMPER_BY_ID: id => `/campers/${id}`
};

const handleApiError = (error) => {
  return error.response ? error.response.data : error.message;
};

const buildParams = ({ page, limit, ...filterParams }) => ({
  page,
  limit,
  ...filterParams
});

export const getCampers = createAsyncThunk(
  'campers/getCampers',
  async (params, thunkApi) => {
    try {
      const response = await axios.get(ENDPOINTS.CAMPERS, {
        params: buildParams(params)
      });
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(handleApiError(error));
    }
  }
);

export const getCamperById = createAsyncThunk(
  'campers/getCampersById',
  async (id, thunkApi) => {
    try {
      const response = await axios.get(ENDPOINTS.CAMPER_BY_ID(id));
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(handleApiError(error));
    }
  }
);

export const getLocations = createAsyncThunk(
  'campers/getLocations',
  async (_, thunkApi) => {
    try {
      const response = await axios.get(ENDPOINTS.CAMPERS);
      return response.data.items; 
    } catch (error) {
      return thunkApi.rejectWithValue(handleApiError(error));
    }
  }
);
