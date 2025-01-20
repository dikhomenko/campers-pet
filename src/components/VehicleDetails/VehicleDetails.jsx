import { useState } from 'react';
import { useSelector } from 'react-redux';
import AdditionalInfo from '../AdditionalInfo/AdditionalInfo.jsx';
import css from './VehicleDetails.module.css';
import { selectCurrentCamper } from '../../redux/campers/selectors.js';
import Icon from '../Icon/Icon.jsx';
import Loader from '../Loader/Loader.jsx';

const VehicleDetails = () => {
  const camper = useSelector(selectCurrentCamper);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');

  if (!camper) {
    return <Loader />;
  }

  const { name, location, rating, price, reviews, gallery, description } =
    camper;

  const openModal = image => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage('');
  };

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) closeModal();
  };

  // Закриття на клавішу Esc
  const handleKeyDown = e => {
    if (e.key === 'Escape') closeModal();
  };

  return (
    <div
      className={css.padded_container}
      onKeyDown={isModalOpen ? handleKeyDown : null}
      tabIndex={-1}
    >
      <div className={css.info_container}>
        <h2 className={css.item_name}>{name}</h2>
        <div className={css.flex_center_row}>
          <Icon
            id="star-ic"
            className={css.inline_rating_icon}
            stroke="none"
            fill="#FFC531"
            size="16px"
          />
          <p className={css.inline_rating}>
            {rating} ({reviews.length} Reviews)
          </p>
          <Icon
            className={css.inline_rating_icon}
            id="map-ic"
            stroke="none"
            fill="inherit"
            size="16px"
          />
          <p className={css.inline_location}>{location}</p>
        </div>
        <span>
          <p className={css.price}>
            &#x20AC;{price ? Number(price).toFixed(2) : '0.00'}
          </p>
        </span>
      </div>
      <div className={css.flex_gallery_container}>
        <ul className={css.flex_gallery}>
          {gallery.map((img, index) => (
            <li
              className={css.item}
              key={index}
              onClick={() => openModal(img.original)}
            >
              <img
                className={css.gallery_image}
                width="292px"
                height="312px"
                src={img.thumb}
                alt={`${name} - ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </div>
      <p className={css.item_description}>{description}</p>
      <AdditionalInfo />

      {/* Модальне вікно */}
      {isModalOpen && (
        <div className={css.modal_backdrop} onClick={handleBackdropClick}>
          <div className={css.centered_modal}>
            <button className={css.modal_close_button} onClick={closeModal}>
              &times;
            </button>
            <img
              src={modalImage}
              alt="Enlarged View"
              className={css.modal_image}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleDetails;
