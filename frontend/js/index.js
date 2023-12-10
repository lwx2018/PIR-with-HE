// import pages
import * as Sentry from '@sentry/browser';
import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';

import '../sass/style.scss';

import App from './App';
import ModelInputApp from './ModelInputApp';
import ModelManageApp from './ModelManageApp';

Sentry.init({
  dsn: window.SENTRY_DSN,
  release: window.COMMIT_SHA,
});

const root = createRoot(document.getElementById('react-app'));
root.render(<App />);
if (document.getElementById('react-app') !== null) {
  ReactDOM.render(<App />, document.getElementById('react-app'));
} else if (document.getElementById('model-input-app') !== null) {
  ReactDOM.render(<ModelInputApp />, document.getElementById('model-input-app'));
} else if (document.getElementById('model-manage-app') !== null) {
  ReactDOM.render(<ModelManageApp />, document.getElementById('model-manage-app'));
} 
