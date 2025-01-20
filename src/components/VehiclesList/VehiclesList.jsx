import { useDispatch, useSelector } from 'react-redux';
import {
  selectCampers,
  selectIsLoading,
  selectPage,
  selectTotalCampers,
} from '../../redux/campers/selectors.js';
import VehiclesListItem from '../VehiclesListItem/VehiclesListItem.jsx';
import css from './VehiclesList.module.css';
import { getCampers } from '../../redux/campers/api.js';
import { setPage } from '../../redux/campers/slice.js';
import { useEffect } from 'react';
import Loader from '../Loader/Loader.jsx';
import Button from '../Button/Button.jsx';

const VehiclesList = () => {
  const dispatch = useDispatch();
  const campers = useSelector(selectCampers);
  const totalCampers = useSelector(selectTotalCampers);
  const isLoading = useSelector(selectIsLoading);

  const page = useSelector(selectPage);
  const limit = 4;
  const totalPages = Math.ceil(totalCampers / limit);
  const buttonIsActive = page < totalPages;

  const filters = useSelector(state => state.campers.filters);

  useEffect(() => {
    dispatch(getCampers({ page, limit, filterParams: filters }));
  }, [dispatch, page, filters]);

  const loadMore = () => {
    if (buttonIsActive) {
      dispatch(setPage(page + 1));
    }
  };

  return (
    <>
      {isLoading && !campers.length ? (
        <div className={css.campers_item_list_wrapper}>
          <Loader />
        </div>
      ) : campers.length > 0 ? (
        <div className={css.campers_item_list_wrapper}>
          <ul className={css.campers_item_list}>
            {campers.map(camper => (
              <VehiclesListItem key={camper.id} {...camper} />
            ))}
          </ul>
          {isLoading && <Loader />}

          {buttonIsActive && (
            <Button
              className={
                isLoading ? css.load_more_button_loading : css.load_more_button
              }
              text={isLoading ? 'Loading...' : 'Load more'}
              onClick={loadMore}
            />
          )}
        </div>
      ) : (
        <div className={css.campers_item_list_wrapper}>
          <p className={css.no_results_message}>No campers found</p>
        </div>
      )}
    </>
  );
};

export default VehiclesList;
