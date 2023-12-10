import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { creators as modelStoreCreators } from '../store/model_store';

var seal = null;
var context = null;
var ckksEncoder = null;
var encryptor = null;
var decryptor = null;

const generateKeys = async (params) => {
  // import SEAL from 'node-seal'
  const SEAL = require('node-seal');

  // Wait for the web assembly to fully initialize
  seal = await SEAL();

  ////////////////////////
  // Encryption Parameters
  ////////////////////////

  // Create a new EncryptionParameters
  const schemeType = seal.SchemeType.ckks;
  const securityLevel = seal.SecurityLevel.tc128;
  const polyModulusDegree = params.polyModulusDegree;
  const bitSizes = params.primeBits;

  const encParms = seal.EncryptionParameters(schemeType);

  // Assign Poly Modulus Degree
  encParms.setPolyModulusDegree(polyModulusDegree);

  // Create a suitable set of CoeffModulus primes
  encParms.setCoeffModulus(
    seal.CoeffModulus.Create(
      polyModulusDegree,
      Int32Array.from(bitSizes)
    )
  );

  ////////////////////////
  // Context
  ////////////////////////

  // Create a new Context
  context = seal.Context(encParms, true, securityLevel);

  // Helper to check if the Context was created successfully
  if (!context.parametersSet()) {
    throw new Error('Could not set the parameters in the given context. Please try different encryption parameters.');
  }

  ////////////////////////
  // Keys
  ////////////////////////

  // Create a new KeyGenerator
  const keyGenerator = seal.KeyGenerator(context);

  // Get the SecretKey from the keyGenerator
  const secretKey = keyGenerator.secretKey();

  // Create the other keys (PublicKey, GaloisKey, RelinKey)
  const publicKey = keyGenerator.createPublicKey();
  const galoisKeys = keyGenerator.createGaloisKeys();
  const relinKeys = keyGenerator.createRelinKeys();

  // Create a CkksEncoder (only ckks SchemeType)
  ckksEncoder = seal.CKKSEncoder(context);

  // Create an Encryptor
  encryptor = seal.Encryptor(context, publicKey);

  // Create a Decryptor
  decryptor = seal.Decryptor(context, secretKey);

  const encodedPublicKey = publicKey.save();
  const encodedGaloisKeys = galoisKeys.save();
  const encodedRelinKeys = relinKeys.save();

  return {
    'encodedPublicKey': encodedPublicKey,
    'encodedGaloisKeys': encodedGaloisKeys,
    'encodedRelinKeys': encodedRelinKeys
  };
};

const encryptInputs = (params, inputs) => {
  var plainInputs = {};
  var encryptedInputs = {};
  var result = {};

  const power = params.primeBits[1];
  console.log("power: " + power);

  for (const key of Object.keys(inputs)) {
    plainInputs[key] = seal.PlainText();
    encryptedInputs[key] = seal.CipherText();

    // Encode data to a PlainText
    ckksEncoder.encode(
      Float64Array.from([inputs[key]]),
      Math.pow(2, power),
      plainInputs[key]
    );
    
    // Encrypt a PlainText
    encryptor.encrypt(
      plainInputs[key],
      encryptedInputs[key]
    );

    result[key] = encryptedInputs[key].save();
  }
  
  return result;
};

const decryptOutputs = (outputs) => {
  var plainOutputs = {};
  var encryptedOutputs = {};
  var result = {};

  for (const key of Object.keys(outputs)) {
    encryptedOutputs[key] = seal.CipherText();
    encryptedOutputs[key].load(context, outputs[key]);

    plainOutputs[key] = seal.PlainText();

    // Decrypt a CipherText
    decryptor.decrypt(
      encryptedOutputs[key],
      plainOutputs[key]
    );

    // Decode data from a PlainText
    result[key] = ckksEncoder.decode(
      plainOutputs[key]
    );
  }
  
  return result;
};

const EvaModelInput = () => {
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
      <div>format: EVA</div>
      <div>inputVars: {getModelInputs.result ? JSON.parse(getModelInputs.result).inputs.toString() : ''}</div>
      <div>getModelParams: {getModelParams.result}</div>
      <div>generateKeys: {keys ? 'ok' : ''}</div>
      <div>uploadKeys: {uploadKeys.result}</div>
      <div>inputs: <input value={inputsStr} onChange={(e)=>{setInputsStr(e.target.value)}}></input></div>
      <div>encInputs: {encInputs ? 'ok' : ''}</div>
      <div>uploadInputs: {uploadInputs.result}</div>
      <div>evaluate: {evaluate.result}</div>
      <div>decOutput: {decOutputs ? decOutputs['result'][0] : ''}</div>
      <Button onClick={() => {
        const getModelParamsAction = modelStoreCreators.getModelParams();
        dispatch(getModelParamsAction);
      }}>
        Get Parameters
      </Button>
      <Button onClick={async () => {
        const generatedKeys = await generateKeys(JSON.parse(getModelParams.result));
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
        const decryptedOutputs = decryptOutputs(JSON.parse(evaluate.result));
        setDecOutputs(decryptedOutputs);
      }}>
        Decrypt Outputs
      </Button>
    </>
  );
};

export default EvaModelInput;
