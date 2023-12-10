import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { creators as modelStoreCreators } from '../store/model_store';

import EvaModelInput from './EvaModelInput';
import TeeModelInput from './TeeModelInput';

const ModelInput = () => {
  const dispatch = useDispatch();
  const getModelFormat = useSelector((state) => state.getModelFormat);
  useEffect(() => {
    const getModelFormatAction = modelStoreCreators.getModelFormat();
    dispatch(getModelFormatAction);
  }, [dispatch]);
  return (
    <>
      { getModelFormat.result && (
          JSON.parse(getModelFormat.result).format == 'eva' ? <EvaModelInput /> : <TeeModelInput />
        )
      }
    </>
  );
};

export default ModelInput;
