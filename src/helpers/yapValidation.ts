import * as Yup from 'yup';

const validationSchema = (countries: string[]) =>
  Yup.object({
    name: Yup.string()
      .matches(/^[A-ZА-Я][a-zа-я]*$/, 'Name needs a capital letter at the start')
      .required('Name is required'),
    age: Yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .positive('Age must be more than zero')
      .integer('Age must be an integer')
      .required('Age is required'),
    email: Yup.string().email('Incorrect email format').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).*$/,
        'Password must include uppercase letter, lowercase letter, number, and special character'
      )
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
    country: Yup.string()
      .required('Country is required')
      .test('is-valid-country', 'Selected country is not valid', (value) => {
        return countries && countries.includes(value);
      }),
    file: Yup.mixed()
      .required('You must upload a picture')
      .test('fileSize', 'File size should not exceed 2 MB', (value) => {
        if (!value) return true;
        return (value as File).size <= 2 * 1024 * 1024;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (!value) return true;
        return ['image/jpeg', 'image/png'].includes((value as File).type);
      }),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
      .required('You must accept the terms and conditions'),
  });

export default validationSchema;
