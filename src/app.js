import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { AppContainer } from 'react-hot-loader';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Index from './js/index';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.querySelector('#page')
    );
}

render(Index);

if (module.hot) {
  module.hot.accept('./js/index', () => {
    render(Index);
  });
}
