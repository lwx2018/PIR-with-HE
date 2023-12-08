// import pages
import * as Sentry from '@sentry/browser';
import React from 'react';
<<<<<<< HEAD
import { createRoot } from 'react-dom/client';
=======
import ReactDOM from 'react-dom';
>>>>>>> b8f188b (增加PIR相关应用)

import '../sass/style.scss';

import App from './App';
<<<<<<< HEAD
=======
import ModelInputApp from './ModelInputApp';
import ModelManageApp from './ModelManageApp';
>>>>>>> b8f188b (增加PIR相关应用)

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

<<<<<<< HEAD
const root = createRoot(document.getElementById('react-app'));
root.render(<App />);
=======
if (document.getElementById('react-app') !== null) {
  ReactDOM.render(<App />, document.getElementById('react-app'));
} else if (document.getElementById('model-input-app') !== null) {
  ReactDOM.render(<ModelInputApp />, document.getElementById('model-input-app'));
} else if (document.getElementById('model-manage-app') !== null) {
  ReactDOM.render(<ModelManageApp />, document.getElementById('model-manage-app'));
} 
>>>>>>> b8f188b (增加PIR相关应用)
