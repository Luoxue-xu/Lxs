import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import '../css/base/reset.scss';

import Main from './main';
import mainStyle from '../css/main.scss';

import Header from './header';
class Index extends Component {

    render() {
        return (
            <Router>
              <div className={mainStyle.main}>
                <Header />
                <Main />
              </div>
            </Router>
        );
    }

}

export default Index;
