import Icon from '../Icon/Icon.jsx';
import css from './Details.module.css';

const Details = ({ camper }) => {
  const {
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
    form,
    length,
    width,
    height,
    tank,
    consumption,
  } = camper;
  return (
    <div className={css.padded_container}>
      <div className={css.flex_wrap_container}>
        {transmission === 'automatic' && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="gear_ic" size="20px" />
            <p className={css.option}>{transmission}</p>
          </div>
        )}
        <div className={css.badge_box}>
          <Icon className={css.primary_icon} id="petrol_ic" size="20px" />
          <p className={css.option}>{engine}</p>
        </div>
        {AC && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="wind_ic" size="20px" />
            <p className={css.option}>AC</p>
          </div>
        )}
        {bathroom && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="shower_ic" size="20px" />
            <p className={css.option}>Bathroom</p>
          </div>
        )}
        {kitchen && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="cup_ic" size="20px" />
            <p className={css.option}>Kitchen</p>
          </div>
        )}
        {TV && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="tv-ic" size="20px" />
            <p className={css.option}>TV</p>
          </div>
        )}
        {radio && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="radio_ic" size="20px" />
            <p className={css.option}>Radio</p>
          </div>
        )}
        {refrigerator && (
          <div className={css.badge_box}>
            <Icon className={css.primary_icon} id="refrigerator_ic" size="20px" />
            <p className={css.option}>Refrigerator</p>
          </div>
        )}
        {microwave && (
          <div className={css.badge_box}>
            <Icon
              className={css.primary_icon}
              id="microwave_ic"
              size="20px"
              fill="none"
              stroke="#101828"
            />
            <p className={css.option}>Microwave</p>
          </div>
        )}
        {gas && (
          <div className={css.badge_box}>
            <Icon
              className={css.primary_icon}
              id="gas_ic"
              fill="none"
              stroke="#101828"
              size="20px"
            />
            <p className={css.option}>Gas</p>
          </div>
        )}
        {water && (
          <div className={css.badge_box}>
            <Icon
              className={css.primary_icon}
              id="water_ic"
              fill="none"
              stroke="#101828"
              size="20px"
            />
            <p className={css.option}>Water</p>
          </div>
        )}
      </div>
      <h3 className={css.section_title}>Vehicle details</h3>
      <div className={css.info_column}>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Form</h4>
          <p className={css.text}>{form}</p>
        </div>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Length</h4>
          <p className={css.text}>
            {length.replace(/(\d+(\.\d+)?)([a-zA-Z]+)/, '$1 $3')}
          </p>
        </div>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Width</h4>
          <p className={css.text}>
            {width.replace(/(\d+(\.\d+)?)([a-zA-Z]+)/, '$1 $3')}
          </p>
        </div>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Height</h4>
          <p className={css.text}>
            {height.replace(/(\d+(\.\d+)?)([a-zA-Z]+)/, '$1 $3')}
          </p>
        </div>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Tank</h4>
          <p className={css.text}>
            {tank.replace(/(\d+(\.\d+)?)([a-zA-Z]+)/, '$1 $3')}
          </p>
        </div>
        <div className={css.info_flex_box}>
          <h4 className={css.subtitle}>Consumption</h4>
          <p className={css.text}>{consumption}</p>
        </div>
      </div>
    </div>
  );
};

export default Details;
