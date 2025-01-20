import { selectFavorite } from '../../redux/campers/selectors.js';
import Icon from '../Icon/Icon.jsx';
import css from './VehiclesListItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/campers/slice.js';
import Button from '../Button/Button.jsx';
const VehiclesListItem = ({
  id,
  name,
  price,
  rating,
  location,
  description,
  reviews,
  gallery,
  AC,
  bathroom,
  kitchen,
  TV,
  radio,
  refrigerator,
  microwave,
  gas,
  water,
  engine,
  transmission,
}) => {
  const dispatch = useDispatch();
  const favoriteVehicles = useSelector(selectFavorite);
  const handleClick = () => {
    dispatch(toggleFavorite(id));
  };

  const isFavorite = favoriteVehicles.includes(id);

  return (
    <li className={css.product_card}>
      <img className={css.product_image} src={gallery[0].thumb} />
      <div className={css.product_info_wrapper}>
        <div className={css.thumb}>
          <div className={css.flex_justify_between}>
            <h2 className={css.product_name}>{name}</h2>
            <span>
              {' '}
              <p className={css.product_price}>
                &#x20AC;{price ? Number(price).toFixed(2) : '0.00'}
              </p>
              <Icon
                id={'heart-ic'}
                size="24px"
                className={isFavorite ? css.heartIconFilled : css.heart_icon}
                onClick={handleClick}
              />
            </span>
          </div>

          <div className={css.flex_align_cente}>
            <Icon
              id="star-ic"
              className={css.rating_icon}
              stroke="none"
              fill="#FFC531"
              size="16px"
            />
            <div className={css.border_bottom_primary}>
              <p className={css.rating}>
                {rating}({reviews.length} Reviews)
              </p>
            </div>
            <div className={css.location_container}>
              {' '}
              <Icon
                className={css.rating_icon}
                id="map-ic"
                stroke="none"
                fill="inherit"
                size="16px"
              />
              <p className={css.location}>{location}</p>
            </div>
          </div>
        </div>

        <div className={css.thumb_3}>
          <p className={css.product_description}>{description}</p>
        </div>

        <div className={css.flex_wrap_with_gap}>
          {transmission === 'automatic' && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="gear_ic" size="20px" />
              <p className={css.option}>{transmission}</p>
            </div>
          )}
          <div className={css.flex_box}>
            <Icon className={css.icon} id="petrol_ic" size="20px" />
            <p className={css.option}>{engine}</p>
          </div>
          {AC && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="wind_ic" size="20px" />
              <p className={css.option}>AC</p>
            </div>
          )}
          {bathroom && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="shower_ic" size="20px" />
              <p className={css.option}>Bathroom</p>
            </div>
          )}
          {kitchen && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="cup_ic" size="20px" />
              <p className={css.option}>Kitchen</p>
            </div>
          )}
          {TV && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="tv-ic" size="20px" />
              <p className={css.option}>TV</p>
            </div>
          )}
          {radio && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="radio_ic" size="20px" />
              <p className={css.option}>Radio</p>
            </div>
          )}
          {refrigerator && (
            <div className={css.flex_box}>
              <Icon className={css.icon} id="refrigerator_ic" size="20px" />
              <p className={css.option}>Refrigerator</p>
            </div>
          )}
          {microwave && (
            <div className={css.flex_box}>
              <Icon
                className={css.icon}
                id="microwave_ic"
                size="20px"
                fill="none"
                stroke="#101828"
              />
              <p className={css.option}>Microwave</p>
            </div>
          )}
          {gas && (
            <div className={css.flex_box}>
              <Icon
                className={css.icon}
                id="gas_ic"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={css.option}>Gas</p>
            </div>
          )}
          {water && (
            <div className={css.flex_box}>
              <Icon
                className={css.icon}
                id="water_ic"
                fill="none"
                stroke="#101828"
                size="20px"
              />
              <p className={css.option}>Water</p>
            </div>
          )}
        </div>
        <Link to={`/catalog/${id}/features`} rel="noopener noreferrer" replace>
          <Button text="Show more" className={css.primary_button} />
        </Link>
      </div>
    </li>
  );
};

export default VehiclesListItem;
