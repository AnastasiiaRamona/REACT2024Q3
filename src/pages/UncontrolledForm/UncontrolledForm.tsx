import Navigation from '../../components/Navigation/Navigation';
import TextContent from '../../components/TextContent/TextContent';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import SelectInput from '../../components/SelectInput/SelectInput';
import Checkbox from '../../components/Checkbox/Checkbox';
import FileInput from '../../components/FileInput/FileInput';
import CountryInput from '../../components/CountryInput/CountryInput';
import '../Form.css';
import Button from '../../components/Button/Button';
import { genderOptions } from '../../data/data';
import validationSchema from '../../helpers/yapValidation';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import convertToBase64 from '../../helpers/converterToBase64';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../store/reducers/countriesSlice';
import { RootState } from '../../store/store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setFormData } from '../../store/reducers/formSlice';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const [isFormTouched, setIsFormTouched] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<string[], void, Action>>();

  const countries = useSelector((state: RootState) => state.countries.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const validateForm = async () => {
    const formValues = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      country: countryRef.current?.value || '',
      file: fileRef.current?.files ? fileRef.current.files[0] : null,
      terms: termsRef.current?.checked || false,
    };

    try {
      await validationSchema(countries).validate(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsFormSubmitted(true);
    const isValid = await validateForm();
    if (isValid) {
      const file = fileRef.current?.files ? fileRef.current.files[0] : null;
      let fileBase64: string | ArrayBuffer | null = null;
      if (file) {
        fileBase64 = await convertToBase64(file);
      }
      const formValues = {
        name: nameRef.current?.value || '',
        age: parseInt(ageRef.current?.value || '0', 10),
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        country: countryRef.current?.value || '',
        file: fileBase64,
      };
      navigate('/home');
      dispatch(setFormData(formValues));
    }
  };

  const handleInputChange = async () => {
    setIsFormTouched(true);
    if (isFormSubmitted) {
      await validateForm();
    }
  };

  return (
    <main>
      <Navigation />
      <form onSubmit={handleSubmit}>
        <TextContent label='Name' name='name' ref={nameRef} onChange={handleInputChange} />
        {errors.name && <div className='error'>{errors.name}</div>}

        <div className='form-row'>
          <TextContent
            label='Age'
            name='age'
            type='number'
            min='0'
            ref={ageRef}
            className='small-input'
            onChange={handleInputChange}
          />

          <SelectInput
            label='Gender'
            name='gender'
            ref={genderRef}
            options={genderOptions}
            className='small-input'
            onChange={handleInputChange}
          />
        </div>
        {errors.age && <div className='error'>{errors.age}</div>}

        <TextContent label='Email' name='email' type='email' ref={emailRef} onChange={handleInputChange} />
        {errors.email && <div className='error'>{errors.email}</div>}

        <CountryInput label='Country' name='country' ref={countryRef} onChange={handleInputChange} />
        {errors.country && <div className='error'>{errors.country}</div>}

        <PasswordInput label='Password' name='password' ref={passwordRef} onChange={handleInputChange} />
        {errors.password && <div className='error'>{errors.password}</div>}

        <PasswordInput
          label='Confirm Password'
          name='confirmPassword'
          ref={confirmPasswordRef}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

        <FileInput label='Upload Picture' name='file' ref={fileRef} onChange={handleInputChange} />
        {errors.file && <div className='error'>{errors.file}</div>}

        <Checkbox label='I accept the Terms and Conditions' name='terms' ref={termsRef} onChange={handleInputChange} />
        {errors.terms && <div className='error'>{errors.terms}</div>}

        <Button type='submit' text='Sign up' disabled={!isFormTouched || Object.keys(errors).length > 0} />
      </form>
    </main>
  );
};

export default UncontrolledForm;
