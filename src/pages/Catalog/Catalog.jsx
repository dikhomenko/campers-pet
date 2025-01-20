import { useEffect } from 'react';
import VehiclesList from '../../components/VehiclesList/VehiclesList.jsx';
import Filters from '../../components/Filters/Filters.jsx';
import css from './Catalog.module.css';
import { useDispatch } from 'react-redux';
import { clearCampers, resetPage } from '../../redux/campers/slice.js';
import { getCampers, getLocations } from '../../redux/campers/api.js';

const Catalog = () => {
  const dispatch = useDispatch();
  dispatch(resetPage());
  dispatch(clearCampers());
  dispatch(getCampers());
  dispatch(getLocations());
  return (
    <div className={css.product_grid}>
      <Filters />
      <VehiclesList />
    </div>
  );
};

export default Catalog;
