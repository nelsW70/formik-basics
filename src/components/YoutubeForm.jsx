import { useState } from 'react';
import {
  ErrorMessage,
  FastField,
  Field,
  FieldArray,
  Formik,
  Form,
} from 'formik';
import * as Yup from 'yup';
import TextError from './TextError';

const initialValues = {
  name: 'Carl',
  email: '',
  channel: '',
  comments: '',
  address: '',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const savedValues = {
  name: 'Carl',
  email: 'carl@example.com',
  channel: 'codevolution',
  comments: 'Welcome to Formik',
  address: '221b Baker Street',
  social: {
    facebook: '',
    twitter: '',
  },
  phoneNumbers: ['', ''],
  phNumbers: [''],
};

const onSubmit = (values, onSubmitProps) => {
  console.log('form data', values);
  console.log('submit props', onSubmitProps);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email format').required('Required'),
  channel: Yup.string().required('Required'),
});

const validateComments = value => {
  let error;
  if (!value) {
    error = 'Required';
  }
  return error;
};

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);

  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
    >
      {formik => {
        console.log('formik props', formik);
        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field type="text" id="name" name="name" />
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field type="text" id="email" name="email" />
              <ErrorMessage name="email">
                {errorMsg => <div className="error">{errorMsg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="YouTube channel name"
              />
              <ErrorMessage name="channel" />
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                as="textarea"
                id="comments"
                name="comments"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {props => {
                  const { field, meta } = props;
                  return (
                    <div>
                      <input type="text" id="address" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error}</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPhone">Primary phone number</label>
              <Field type="text" id="primaryPhone" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPhone">Secondary phone number</label>
              <Field type="text" id="secondaryPhone" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {fieldArrayProps => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              {' '}
                              -{' '}
                            </button>
                          )}

                          <button type="button" onClick={() => push('')}>
                            {' '}
                            +{' '}
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>
            {/* <button
              type="button"
              onClick={() => formik.validateField('comments')}
            >
              Validate comments
            </button>
            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button>
            <button
              type="button"
              onClick={() => formik.setFieldTouched('comments')}
            >
              Visit comments
            </button>
            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit fields
            </button> */}
            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>
            <button type="reset">Reset</button>
            <button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
