import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Index from './js/Index';
import './css/index/index.scss';



const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.querySelector('#wrapper')
    );
}

render(Index);

if (module.hot) {
  module.hot.accept('./js/Index', () => {
    render(Index);
  });
}
