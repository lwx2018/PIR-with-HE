import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import ModelManage from './pages/ModelManage';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const ModelManageApp = () => (
  <SentryBoundary>
    <Provider store={store}>
      <ModelManage />
    </Provider>
  </SentryBoundary>
);

export default hot(ModelManageApp);
