import React from 'react';
import css from './Home.module.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.jsx';

const Home = () => {
  return (
    <>
      <div className={css.background_hero}>
        <div className={css.title}>
          <h1 className={css.hero_title_main}>Campers of your dreams</h1>
          <h2 className={css.hero_title_subtext}>
            You can find everything you want in our catalog
          </h2>
          <Link to="/catalog">
            <Button text="View Now" className={css.hero_button} />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
