import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik-control.js';

function SearchForm(props) {
  const initialValue = {
    text: '',
  };

  const [value, setSearchTerm] = useState(initialValue);
  const { handleResume } = props;

  const validationSchema = Yup.object({
    text: Yup.string().required('Required'),
  });

  const onSubmit = (value) => {
    const { text } = value;
    console.log('text on submit: ', text);
    handleResume(text);
  };

  return (
    <Formik
      initialValues={value}
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
            <button
              className="waves-effect waves-light btn"
              type="submit"
              disabled={!formik.isValid}
            >
              Search
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default SearchForm;
