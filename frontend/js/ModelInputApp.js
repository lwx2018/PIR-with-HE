import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

import ModelInput from './pages/ModelInput';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const ModelInputApp = () => (
  <SentryBoundary>
    <Provider store={store}>
      <ModelInput />
    </Provider>
  </SentryBoundary>
);

export default hot(ModelInputApp);
