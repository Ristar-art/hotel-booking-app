import React from 'react';
import './signUp.css'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { 
  setLoading,
  setError,
  clearError,
  clearForm,
} from './singUpSlice';

function SignUp() {
  const dispatch = useDispatch();
  const { isLoading,} = useSelector(
    (state) => state.signUp
  );

  const validationSchema = yup.object().shape({
    name: yup.string().required('Username is required'),
    email: yup.string().required('Email is required').email('Invalid email format'),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    passwordRepeat: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      passwordRepeat: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(setLoading(true));

      try {
        const response = await fetch('http://localhost:8000/api/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values), // Pass the entire values object
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log(data);
          dispatch(setLoading(false));
          dispatch(clearError());
          dispatch(clearForm());
        } else {
          const errorData = await response.json();
          dispatch(setLoading(false));
          dispatch(setError(errorData.error)); // Use the correct error property from the API response
        }
      } catch (error) {
        console.error('Error during fetch:', error);
        dispatch(setLoading(false));
        dispatch(setError('An error occurred while registering. Please try again later.'));
      }
    },
  });

  return (
    <div className="signUp-body">
     
      <form onSubmit={formik.handleSubmit}>
     
        <input
          placeholder="Username"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <br />
        <input
          placeholder="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <br />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <br />
        <input
          placeholder="Repeat Password"
          name="passwordRepeat"
          type="password"
          value={formik.values.passwordRepeat}
          onChange={formik.handleChange}
        />
        <br />
        {!isLoading ? (
          <button type="submit">Register</button>
        ) : (
          <button type="submit" disabled>Loading...</button>
        )}
      </form>
    </div>
  );
}

export default SignUp;
