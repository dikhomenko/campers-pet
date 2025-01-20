import { useSelector } from 'react-redux';
import { selectCurrentCamper } from '../../redux/campers/selectors.js';
import Details from '../Details/Details.jsx';

const VehicleFeatures = () => {
  const camper = useSelector(selectCurrentCamper);
  return (
    <>
      <Details camper={camper} />
    </>
  );
};

export default VehicleFeatures;
