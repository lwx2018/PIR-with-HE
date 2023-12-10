import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';

import { creators as modelStoreCreators } from '../store/model_store';

const PirdataServer = () => {
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    pir_id: '',
    name: '',
    id_number: '',
    product_id: '',
    hold_date: '',
    amount: '',
    value: ''
  });

  const [tableData, setTableData] = useState([]);
  const uploadPirdata = useSelector((state) => state.uploadPirdata);

  useEffect(() => {
    // Update the table data when uploadPirdata.result changes
    if (uploadPirdata.result) {
      const { code, format } = JSON.parse(uploadPirdata.result);
      setTableData(prevTableData => [...prevTableData, inputData]);
    }
  }, [uploadPirdata.result, inputData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    const uploadPirdataAction = modelStoreCreators.uploadPirdata(inputData);
    dispatch(uploadPirdataAction);
  };

  return (
    <>
      <table style={{ width: '100%' }}>
        <tbody>
          <tr>
            <td>
              <p>Data Input</p>
              <input type="text" name="pir_id" placeholder="编号" onChange={handleChange} />
              <input type="text" name="name" placeholder="姓名" onChange={handleChange} />
              <input type="text" name="id_number" placeholder="证件号" onChange={handleChange} />
              <input type="text" name="product_id" placeholder="产品编码" onChange={handleChange} />
              <input type="text" name="hold_date" placeholder="持有日期" onChange={handleChange} />
              <input type="text" name="amount" placeholder="数量" onChange={handleChange} />
              <input type="text" name="value" placeholder="金额" onChange={handleChange} />
            </td>
            <td>
              {tableData.length > 0 && (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      {Object.keys(tableData[0]).map((key) => (
                        <th key={key}>{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, index) => (
                          <td key={index}>{value}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </td>
          </tr>
          <tr>
            <td>
            <Button onClick={() => {
              const uploadPirdataAction = modelStoreCreators.uploadPirdata(model);
              dispatch(uploadPirdataAction);
            }}>
              Upload Pirdata
            </Button>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PirdataServer;
