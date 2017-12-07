import React from 'react';
import { render } from 'react-dom';
//import { HashRouter, Route, NavLink, Switch } from 'react-router-dom';
import Redux, { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import './styles/app.scss';

import App from './containers/App';
import configureStore from './store/configureStore';

const store = configureStore();



render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
)
