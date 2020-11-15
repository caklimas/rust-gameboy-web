import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getStore } from './redux/store';
import App from './components/App/App';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={getStore()}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);