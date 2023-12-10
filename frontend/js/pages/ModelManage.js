import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';

import { creators as modelStoreCreators } from '../store/model_store';

const ModelManage = () => {
  const dispatch = useDispatch();
  const uploadModel = useSelector((state) => state.uploadModel);
  useEffect(() => {
  }, [dispatch]);
  const [model, setModel] = useState('');

  const textareaStyle = {height:'400px', width:'100%'};

  return (
    <>
      <table style={{ width:'100%' }}>
        <tr>
          <td>
            <p>Business Model</p>
            <p>Model language: PLang</p>
          </td>
          <td>
            <p>Generated Code (in Python)</p>
            <p>Target: { uploadModel.result ? JSON.parse(uploadModel.result).format : '' }</p>
          </td>
        </tr>
        <tr>
          <td style={{ width:'50%' }}>
            <textarea style={textareaStyle} value={model} onChange={(e) => {
              setModel(e.target.value);
            }}>
            </textarea>
          </td>
          <td style={{ width:'50%' }}>
            { uploadModel.result ? 
              <textarea style={textareaStyle} value={JSON.parse(uploadModel.result).code}>
              </textarea> : 
              <textarea style={textareaStyle}>
              </textarea>
            }
          </td>
        </tr>
        <tr>
          <td>
            <Button onClick={() => {
              const uploadModelAction = modelStoreCreators.uploadModel(model);
              dispatch(uploadModelAction);
            }}>
              Upload Model
            </Button>
          </td>
          <td></td>
        </tr>
      </table>
      
      
    </>
  );
};

export default ModelManage;
