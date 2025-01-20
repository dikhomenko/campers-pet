import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import css from './Header.module.css';
import logo from '../../img/logo.svg';
const Header = () => {
  return (
    <>
      <header>
        <div className={css.header_wrapper}>
          <Link to="/">
            <img src={logo} alt="Logo" className={css.header_logo} />
          </Link>
          <nav className={css.header_navigation}>
            <NavLink
              className={({ isActive }) =>
                isActive ? css.active_link : css.navigation_link
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? css.active_link : css.navigation_link
              }
              to="/catalog"
            >
              Catalog
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
