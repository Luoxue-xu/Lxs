import React from 'react';
import {
  Link
} from 'react-router-dom';
import headerStyle from '../css/header.scss';

const Header = (props) => (
    <header className={headerStyle.header}>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/about">关于我</Link></li>
        <li><Link to="/learn">研究</Link></li>
    </header>
);

export default Header;
