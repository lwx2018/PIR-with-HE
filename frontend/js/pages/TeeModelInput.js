import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { creators as modelStoreCreators } from '../store/model_store';

const NodeRSA = require('node-rsa');

var localKey = null;
var remoteKey = null;

const generateKeys = (params) => {
  localKey = new NodeRSA();
  remoteKey = new NodeRSA();
 
  localKey.generateKeyPair(params.rsaBits, params.rsaExp);
  remoteKey.importKey(params.rsaPk, 'pkcs1-public-pem');

  const localPubKey = localKey.exportKey('pkcs1-public-pem');
  
  return {
    'clientPubKey': localPubKey
  };
};

const encryptInputs = (params, inputs) => {
  const jsonInputs = JSON.stringify(inputs);
  const encryptedInputs = remoteKey.encrypt(jsonInputs, 'base64');

  return encryptedInputs;
};

const decryptOutputs = (outputs) => {
  const result = localKey.decrypt(outputs, 'utf8');
  
  return result;
};

const TeeModelInput = () => {
  const dispatch = useDispatch();
  const getModelParams = useSelector((state) => state.getModelParams);
  const getModelInputs = useSelector((state) => state.getModelInputs);
  const [keys, setKeys] = useState(null);
  const uploadKeys = useSelector((state) => state.uploadKeys);
  const [inputsStr, setInputsStr] = useState('');
  const [encInputs, setEncInputs] = useState(null);
  const uploadInputs = useSelector((state) => state.uploadInputs);
  const evaluate = useSelector((state) => state.evaluate);
  const [decOutputs, setDecOutputs] = useState(null);
  useEffect(() => {
    const getModelInputsAction = modelStoreCreators.getModelInputs();
    dispatch(getModelInputsAction);
  }, [dispatch]);

  return (
    <>
      <div>format: TEE</div>
      <div>inputVars: {getModelInputs.result ? JSON.parse(getModelInputs.result).inputs.toString() : ''}</div>
      <div>getModelParams: {getModelParams.result}</div>
      <div>generateKeys: {keys ? JSON.stringify(keys) : ''}</div>
      <div>uploadKeys: {uploadKeys.result}</div>
      <div>inputs: <input value={inputsStr} onChange={(e)=>{setInputsStr(e.target.value)}}></input></div>
      <div>encInputs: {encInputs ? JSON.stringify(encInputs) : ''}</div>
      <div>uploadInputs: {uploadInputs.result}</div>
      <div>evaluate: {evaluate.result}</div>
      <div>decOutput: {decOutputs ? decOutputs['result'] : ''}</div>
      <Button onClick={() => {
        const getModelParamsAction = modelStoreCreators.getModelParams();
        dispatch(getModelParamsAction);
      }}>
        Get Parameters
      </Button>
      <Button onClick={() => {
        const generatedKeys = generateKeys(JSON.parse(getModelParams.result));
        setKeys(generatedKeys);
      }}>
        Generate Keys
      </Button>
      <Button onClick={() => {
        const uploadKeysAction = modelStoreCreators.uploadKeys(keys);
        dispatch(uploadKeysAction);
      }}>
        Upload Public Keys
      </Button>
      <Button onClick={() => {
        const inputs = JSON.parse(inputsStr);
        const encryptedInputs = encryptInputs(JSON.parse(getModelParams.result), inputs);
        setEncInputs(encryptedInputs);
      }}>
        Encrypt Inputs
      </Button>
      <Button onClick={() => {
        const uploadInputsAction = modelStoreCreators.uploadInputs(encInputs);
        dispatch(uploadInputsAction);
      }}>
        Upload Encrypted Inputs
      </Button>
      <Button onClick={() => {
        const evaluateAction = modelStoreCreators.evaluate();
        dispatch(evaluateAction);
      }}>
        Evaluate
      </Button>
      <Button onClick={() => {
        const decryptedOutputs = JSON.parse(decryptOutputs(JSON.parse(evaluate.result)));
        setDecOutputs(decryptedOutputs);
      }}>
        Decrypt Outputs
      </Button>
    </>
  );
};

export default TeeModelInput;
