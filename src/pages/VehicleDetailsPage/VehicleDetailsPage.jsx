import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VehicleDetails from '../../components/VehicleDetails/VehicleDetails.jsx';
import { getCamperById } from '../../redux/campers/api.js';

const VehicleDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, currentCamper } = useSelector(state => state.campers);

  useEffect(() => {
    if (id) {
      dispatch(getCamperById(id));
    }
  }, [dispatch, id]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {currentCamper && <VehicleDetails />}
    </>
  );
};

export default VehicleDetailsPage;
