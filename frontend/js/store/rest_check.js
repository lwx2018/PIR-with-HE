<<<<<<< HEAD
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import api from './api';

// Thunks
export const fetchRestCheck = createAsyncThunk('restCheck/fetch', async () => {
  const res = await api.get('/api/rest/rest-check/');
  return res.data;
});

// Reducer
export const restCheckReducer = createSlice({
  name: 'restCheck',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRestCheck.pending, (state) => {
      state.data = {
        isLoading: true,
      };
    });
    builder.addCase(fetchRestCheck.fulfilled, (state, action) => {
      state.data = {
        isLoading: false,
        payload: action.payload,
      };
    });
    builder.addCase(fetchRestCheck.rejected, (state, action) => {
      state.data = {
        isLoading: false,
        error: action.error,
      };
    });
  },
}).reducer;
=======
import api from './api';

// Action types
const types = {
  FETCH_REQUESTED: 'rest_check/FETCH_REQUESTED',
  FETCH_SUCCESS: 'rest_check/FETCH_SUCCESS',
  FETCH_ERROR: 'rest_check/FETCH_ERROR',
};

// Action creators
export const creators = {
  fetchRestCheck: () => {
    return async (dispatch) => {
      dispatch({ type: types.FETCH_REQUESTED });
      try {
        const res = await api.get('/api/rest/rest-check/');
        dispatch({ type: types.FETCH_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.FETCH_ERROR, error });
      }
    };
  },
};

// Reducer
export const restCheckReducer = (state = {}, action) => {
  if (action.type === types.FETCH_SUCCESS) return action.data;
  return state;
};
>>>>>>> b8f188b (增加PIR相关应用)
