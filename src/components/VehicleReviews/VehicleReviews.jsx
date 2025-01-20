import { selectCurrentCamper } from '../../redux/campers/selectors.js';
import Icon from '../Icon/Icon.jsx';
import css from './VehicleReviews.module.css';
import { useSelector } from 'react-redux';

const VehicleReviews = () => {
  const camper = useSelector(selectCurrentCamper);
  const reviews = camper?.reviews || [];

  const renderStars = (rating, reviewId) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <Icon
            key={`${reviewId}-${i}`}
            id="star-ic"
            size="16px"
            className={css.rating_star}
          />
        ) : (
          <Icon
            key={`${reviewId}-${i}`}
            id="star-ic"
            size="16px"
            className={css.inactive_rating_star}
          />
        )
      );
    }
    return stars;
  };

  return (
    <div className={css.content_wrapper}>
      {reviews.length > 0 ? (
        <ul className={css.vertical_list}>
          {reviews.map((review, index) => (
            <li key={index} className={css.flex_column_container}>
              <div className={css.title_flex_container}>
                <div className={css.circular_logo_container}>
                  <div className={css.circular_logo}>
                    <span className={css.centered_letter}>
                      {review.reviewer_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className={css.rating}>
                  <h4 className={css.item_name}>{review.reviewer_name}</h4>
                  <div className={css.stars}>
                    {renderStars(review.reviewer_rating, index)}
                  </div>
                </div>
              </div>
              <p className={css.basic_text}>{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={css.no_reviews}>No reviews available</p>
      )}
    </div>
  );
};

export default VehicleReviews;
