import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const store = createStore(reducer,applyMiddleware(thunk));
console.log('state',store.getState());

ReactDOM.render(
  <Provider store = {store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
