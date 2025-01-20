import css from './ReservationForm.module.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import Button from '../Button/Button.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationForm = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    bookingDate: Yup.date()
      .required('Booking date is required')
      .min(today, 'Booking date cannot be in the past'),
    comment: Yup.string(),
  });

  const handleSubmit = (values, { resetForm }) => {
    toast.success(
      <div>
        Form submitted successfully!
        <br />
        <strong>Name:</strong> {values.name}
        <br />
        <strong>Email:</strong> {values.email}
        <br />
        <strong>Booking date:</strong>{' '}
        {values.bookingDate
          ? values.bookingDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : 'Not selected'}
        <br />
        <strong>Comment:</strong> {values.comment}
      </div>
    );
    resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        bookingDate: today,
        comment: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue, values }) => (
        <Form className={css.form_container}>
          <div className={css.form_title_wrapper}>
            <h3 className={css.form_heading}>Book your campervan now</h3>
            <p className={css.form_text}>
              Stay connected! We are always ready to help you.
            </p>
          </div>
          <div className={css.form_group}>
            <Field
              id="name"
              name="name"
              type="text"
              placeholder="Name*"
              className={css.form_input}
            />
            <ErrorMessage name="name" component="div" className={css.form_error_message} />
          </div>
          <div className={css.form_group}>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Email*"
              className={css.form_input}
            />
            <ErrorMessage name="email" component="div" className={css.form_error_message} />
          </div>
          <div className={css.form_group}>
            <DatePicker
              id="bookingDate"
              className={css.form_input}
              placeholderText="Select a booking date*"
              selected={values.bookingDate}
              onChange={date => setFieldValue('bookingDate', date)}
              minDate={today}
            />
            {errors.bookingDate && touched.bookingDate && (
              <div className={css.form_error_message}>{errors.bookingDate}</div>
            )}
          </div>
          <div className={css.form_group}>
            <Field
              id="comment"
              name="comment"
              as="textarea"
              placeholder="Comment"
              className={css.form_textarea}
            />
            <ErrorMessage
              name="comment"
              component="div"
              className={css.form_error_message}
            />
          </div>
          <Button type="submit" text="Send" className={css.form_submit_button} />
        </Form>
      )}
    </Formik>
  );
};

export default ReservationForm;
