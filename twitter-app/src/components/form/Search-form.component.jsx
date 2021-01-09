import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik-control.js';

// import './form.styles.css';

function SearchForm(props) {
  const { initialValues, handleChange, handleResume } = props;

  const validationSchema = Yup.object({
    text: Yup.string().required('Required'),
  });

  const onSubmit = (values) => {
    const { text } = values;
    console.log('text on submit: ', text);
    // handleChange({ text });
    // handleChange({ text });
    handleResume(text);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <FormikControl
              control="input"
              type="text"
              label="Search"
              name="text"
            />
            <button type="submit" disabled={!formik.isValid}>
              Search
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchForm;

{
  /* <div>
  <input
    id="email"
    type="text"
    className="validate"
    value={searchTerm}
    onKeyPress={handleKeyPress}
    onChange={handleChange}
  />
  <label htmlFor="email">Search</label>
</div>; */
}
