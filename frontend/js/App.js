import React from 'react';
<<<<<<< HEAD
=======
import { hot } from 'react-hot-loader/root';
>>>>>>> b8f188b (增加PIR相关应用)
import { Provider } from 'react-redux';

import Home from './pages/Home';
import configureStore from './store';
import SentryBoundary from './utils/SentryBoundary';

const store = configureStore({});
const App = () => (
  <SentryBoundary>
    <Provider store={store}>
      <Home />
    </Provider>
  </SentryBoundary>
);

<<<<<<< HEAD
export default App;
=======
export default hot(App);
>>>>>>> b8f188b (增加PIR相关应用)
