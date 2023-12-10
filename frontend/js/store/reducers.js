import { combineReducers } from '@reduxjs/toolkit';

import { restCheckReducer as restCheck } from './rest_check';

export const rootReducer = combineReducers({
  restCheck,
});
import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';

import { restCheckReducer as restCheck } from './rest_check';
import {
  uploadModelReducer as uploadModel,
  getModelFormatReducer as getModelFormat,
  getModelInputsReducer as getModelInputs,
  getModelParamsReducer as getModelParams,
  uploadKeysReducer as uploadKeys,
  uploadInputsReducer as uploadInputs,
  evaluateReducer as evaluate,
} from './model_store';

export const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    restCheck,
    uploadModel,
    getModelFormat,
    getModelInputs,
    getModelParams,
    uploadKeys,
    uploadInputs,
    evaluate,
  });
};
