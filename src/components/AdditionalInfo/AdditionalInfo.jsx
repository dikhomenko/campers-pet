import { NavLink, Outlet } from 'react-router-dom';
import css from './AdditionalInfo.module.css';
import ReservationForm from '../ReservationForm/ReservationForm.jsx';

const AdditionalInfo = () => {
  return (
    <>
      <div>
        <nav className={css.navigation_bar}>
          <NavLink
            to="features"
            className={({ isActive }) => (isActive ? css.active : css.navigation_link)}
          >
            Features
          </NavLink>
          <NavLink
            to="reviews"
            className={({ isActive }) => (isActive ? css.active : css.navigation_link)}
          >
            Reviews
          </NavLink>
        </nav>
      </div>
      <div className={css.flex_container}>
        <Outlet />
        <ReservationForm />
      </div>
    </>
  );
};

export default AdditionalInfo;
