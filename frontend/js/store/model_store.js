import api from './api';

// Action types
const types = {
  FETCH_REQUESTED: 'model_store/FETCH_REQUESTED',
  FETCH_SUCCESS: 'model_store/FETCH_SUCCESS',
  FETCH_ERROR: 'model_store/FETCH_ERROR',

  UPLOAD_MODEL_REQUESTED: 'model_store/UPLOAD_MODEL_REQUESTED',
  UPLOAD_MODEL_SUCCESS: 'model_store/UPLOAD_MODEL_SUCCESS',
  UPLOAD_MODEL_ERROR: 'model_store/UPLOAD_MODEL_ERROR',

  GET_MODEL_FORMAT_REQUESTED: 'model_store/GET_MODEL_FORMAT_REQUESTED',
  GET_MODEL_FORMAT_SUCCESS: 'model_store/GET_MODEL_FORMAT_SUCCESS',
  GET_MODEL_FORMAT_ERROR: 'model_store/GET_MODEL_FORMAT_ERROR',

  GET_MODEL_INPUTS_REQUESTED: 'model_store/GET_MODEL_INPUTS_REQUESTED',
  GET_MODEL_INPUTS_SUCCESS: 'model_store/GET_MODEL_INPUTS_SUCCESS',
  GET_MODEL_INPUTS_ERROR: 'model_store/GET_MODEL_INPUTS_ERROR',

  GET_MODEL_PARAMS_REQUESTED: 'model_store/GET_MODEL_PARAMS_REQUESTED',
  GET_MODEL_PARAMS_SUCCESS: 'model_store/GET_MODEL_PARAMS_SUCCESS',
  GET_MODEL_PARAMS_ERROR: 'model_store/GET_MODEL_PARAMS_ERROR',

  UPLOAD_KEYS_REQUESTED: 'model_store/UPLOAD_KEYS_REQUESTED',
  UPLOAD_KEYS_SUCCESS: 'model_store/UPLOAD_KEYS_SUCCESS',
  UPLOAD_KEYS_ERROR: 'model_store/UPLOAD_KEYS_ERROR',

  UPLOAD_INPUTS_REQUESTED: 'model_store/UPLOAD_INPUTS_REQUESTED',
  UPLOAD_INPUTS_SUCCESS: 'model_store/UPLOAD_INPUTS_SUCCESS',
  UPLOAD_INPUTS_ERROR: 'model_store/UPLOAD_INPUTS_ERROR',

  EVALUATE_REQUESTED: 'model_store/EVALUATE_REQUESTED',
  EVALUATE_SUCCESS: 'model_store/EVALUATE_SUCCESS',
  EVALUATE_ERROR: 'model_store/EVALUATE_ERROR',
};

// Action creators
export const creators = {
  uploadModel: (model) => {
    return async (dispatch) => {
      dispatch({ type: types.UPLOAD_MODEL_REQUESTED });
      try {
        const res = await api.post('/api/model/upload-model/', {
          model: model
        });
        dispatch({ type: types.UPLOAD_MODEL_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.UPLOAD_MODEL_ERROR, error });
      }
    };
  },
  getModelFormat: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_MODEL_FORMAT_REQUESTED });
      try {
        const res = await api.get('/api/model/get-model-format/');
        dispatch({ type: types.GET_MODEL_FORMAT_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.GET_MODEL_FORMAT_ERROR, error });
      }
    };
  },
  getModelInputs: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_MODEL_INPUTS_REQUESTED });
      try {
        const res = await api.get('/api/model/get-model-inputs/');
        dispatch({ type: types.GET_MODEL_INPUTS_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.GET_MODEL_INPUTS_ERROR, error });
      }
    };
  },
  getModelParams: () => {
    return async (dispatch) => {
      dispatch({ type: types.GET_MODEL_PARAMS_REQUESTED });
      try {
        const res = await api.get('/api/model/get-model-params/');
        dispatch({ type: types.GET_MODEL_PARAMS_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.GET_MODEL_PARAMS_ERROR, error });
      }
    };
  },
  uploadKeys: (keys) => {
    return async (dispatch) => {
      dispatch({ type: types.UPLOAD_KEYS_REQUESTED });
      try {
        const res = await api.post('/api/model/upload-keys/', {
          keys: keys
        });
        dispatch({ type: types.UPLOAD_KEYS_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.UPLOAD_KEYS_ERROR, error });
      }
    };
  },
  uploadInputs: (encryptedInputs) => {
    return async (dispatch) => {
      dispatch({ type: types.UPLOAD_INPUTS_REQUESTED });
      try {
        const res = await api.post('/api/model/upload-inputs/', {
          encryptedInputs: encryptedInputs
        });
        dispatch({ type: types.UPLOAD_INPUTS_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.UPLOAD_INPUTS_ERROR, error });
      }
    };
  },
  evaluate: () => {
    return async (dispatch) => {
      dispatch({ type: types.EVALUATE_REQUESTED });
      try {
        const res = await api.get('/api/model/evaluate/');
        dispatch({ type: types.EVALUATE_SUCCESS, data: res.data });
      } catch (error) {
        dispatch({ type: types.EVALUATE_ERROR, error });
      }
    };
  },
};

// Reducer
export const uploadModelReducer = (state = {}, action) => {
  if (action.type === types.UPLOAD_MODEL_SUCCESS) return action.data;
  return state;
};

export const getModelFormatReducer = (state = {}, action) => {
  if (action.type === types.GET_MODEL_FORMAT_SUCCESS) return action.data;
  return state;
};

export const getModelInputsReducer = (state = {}, action) => {
  if (action.type === types.GET_MODEL_INPUTS_SUCCESS) return action.data;
  return state;
};

export const getModelParamsReducer = (state = {}, action) => {
  if (action.type === types.GET_MODEL_PARAMS_SUCCESS) return action.data;
  return state;
};

export const uploadKeysReducer = (state = {}, action) => {
  if (action.type === types.UPLOAD_KEYS_SUCCESS) return action.data;
  return state;
};

export const uploadInputsReducer = (state = {}, action) => {
  if (action.type === types.UPLOAD_INPUTS_SUCCESS) return action.data;
  return state;
};

export const evaluateReducer = (state = {}, action) => {
  if (action.type === types.EVALUATE_SUCCESS) return action.data;
  return state;
};