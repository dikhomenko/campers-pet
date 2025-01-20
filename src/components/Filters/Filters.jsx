import css from './Filters.module.css';
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/campers/slice.js';
import { clearCampers, resetPage } from '../../redux/campers/slice.js';
import Icon from '../Icon/Icon.jsx';
import Button from '../Button/Button.jsx';
import Select from 'react-select';
import { components } from 'react-select';
import { selectUniqueLocations } from '../../redux/campers/selectors.js';


const CustomPlaceholder = props => {
  return (
    <components.Placeholder {...props}>
      <span style={{ color: '#aaa', fontSize: '14px' }}>{props.children}</span>
    </components.Placeholder>
  );
};


const customStyles = {
  control: provided => ({
    ...provided,
    width: '100%',
    paddingLeft: '40px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    color: '#333',
    boxSizing: 'border-box',
    cursor: 'pointer',
  }),
  placeholder: provided => ({
    ...provided,
    fontSize: '14px',
  }),
  option: provided => ({
    ...provided,
    fontSize: '14px',
    cursor: 'pointer',
  }),
};

const filterOptions = [
  {
    id: 'AC',
    label: 'AC',
    icon: <Icon className={css.primary_icon} id="wind_ic" size="32px" />,
  },
  {
    id: 'transmission',
    label: 'Automatic',
    value: 'automatic',
    icon: <Icon className={css.primary_icon} id="gear_ic" size="32px" />,
  },
  {
    id: 'kitchen',
    label: 'Kitchen',
    icon: <Icon className={css.primary_icon} id="cup_ic" size="32px" />,
  },
  {
    id: 'TV',
    label: 'TV',
    icon: <Icon className={css.primary_icon} id="tv-ic" size="32px" />,
  },
  {
    id: 'bathroom',
    label: 'Bathroom',
    icon: <Icon className={css.primary_icon} id="shower_ic" size="32px" />,
  },
];

const form = [
  {
    id: 'panelTruck',
    label: 'Van',
    icon: <Icon className={css.primary_icon} id="grid_1x2_ic" size="32px" />,
  },
  {
    id: 'fullyIntegrated',
    label: 'Fully Integrated',
    icon: <Icon className={css.primary_icon} id="grid_ic" size="32px" />,
  },
  {
    id: 'alcove',
    label: 'Alcove',
    icon: <Icon className={css.primary_icon} id="grid_3x3_ic" size="32px" />,
  },
];


const checkbox = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon;

  return (
    <div
      className={`${css.checkbox_button} ${
        field.value.includes(id) ? css.active : ''
      }`}
      onClick={() => {
        const newValue = field.value.includes(id)
          ? field.value.filter(f => f !== id)
          : [...field.value, id];
        field.onChange({ target: { name: field.name, value: newValue } });
      }}
    >
      {IconComponent}
      <span className={css.checkbox_label}>{label}</span>
    </div>
  );
};


const radio = ({ field, icon }) => {
  const { id, label, icon: IconComponent } = icon;

  return (
    <div
      className={`${css.radio_button} ${field.value === id ? css.active : ''}`}
      onClick={() => {
        field.onChange({ target: { name: field.name, value: id } });
      }}
    >
      {IconComponent}
      <span className={css.radio_label}>{label}</span>
    </div>
  );
};

const Filters = () => {
  const dispatch = useDispatch();

  const locations = useSelector(selectUniqueLocations);
  const locationOptions = locations.map(location => {
    const [country, city] = location.split(', ');
    return {
      value: `${country}, ${city}`,
      label: `${country}, ${city}`,
    };
  });

  return (
    <Formik
      initialValues={{
        filters: [],
        form: null,
        location: null,
      }}
      onSubmit={values => {
        const filters = {};


        if (values.location && values.location !== '') {
          filters['location'] = values.location.value;
        }
        if (values.form) filters['form'] = values.form;


        values.filters.forEach(filter => {
          if (filter === 'AC') filters['AC'] = true;
          if (filter === 'transmission') filters['transmission'] = 'automatic';
          if (filter === 'kitchen') filters['kitchen'] = true;
          if (filter === 'TV') filters['TV'] = true;
          if (filter === 'bathroom') filters['bathroom'] = true;
        });


        dispatch(clearCampers());

        dispatch(setFilters(filters));
      }}
    >
      {({ handleSubmit, handleReset, values, setFieldValue }) => (
        <Form
          className={css.form_wrapper}
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <div className={css.location_container}>
            <h3 className={css.title_subtext}>Location</h3>
            <div className={css.input_wrapper}>
              <Icon id="map-ic" className={css.map_icon} size="20px" />
              <div className={css.input}>
                <Select
                  name="location"
                  options={locationOptions}
                  className={css.select}
                  classNamePrefix="select"
                  styles={customStyles}
                  placeholder="Select location"
                  components={{ Placeholder: CustomPlaceholder }}
                  value={values.location}
                  onChange={option => setFieldValue('location', option)}
                  isClearable
                />
              </div>
            </div>
          </div>

          <h3 className={css.filters_heading}>Filters</h3>
          <h3 className={css.heading}>Vehicle Equipment</h3>
          <div className={css.flex_container}>
            {filterOptions.map(option => (
              <Field
                key={option.id}
                name="filters"
                icon={option}
                component={checkbox}
              />
            ))}
          </div>

          <h3 className={css.heading}>Vehicle Type</h3>
          <div className={css.flex_container}>
            {form.map(type => (
              <Field key={type.id} name="form" icon={type} component={radio} />
            ))}
          </div>
          <div className={css.button_box}>
            <Button type="submit" text="Search" className={css.form_submit_button} />
            <Button
              onClick={() => {
                dispatch(resetPage());
              }}
              type="reset"
              text="Reset"
              className={css.form_reset_button}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Filters;
