import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './formik-control.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function SearchForm(props) {
  const { initialValues, handleChange, handleResume } = props;

  const validationSchema = Yup.object({
    text: Yup.string().required('Required'),
  });

  const notify = () => {
    toast.success('Search request was sent');
  };

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
            <button
              className="waves-effect waves-light btn"
              type="submit"
              disabled={!formik.isValid}
              onClick={notify}
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
