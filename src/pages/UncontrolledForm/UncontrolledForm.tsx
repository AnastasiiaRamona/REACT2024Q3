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
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import convertToBase64 from '../../helpers/converterToBase64';
import { useNavigate } from 'react-router-dom';

const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const validateForm = async () => {
    const formValues = {
      name: nameRef.current?.value || '',
      age: ageRef.current?.value || '',
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
      file: fileRef.current?.files ? fileRef.current.files[0] : null,
      terms: termsRef.current?.checked || false,
    };

    try {
      await validationSchema.validate(formValues, { abortEarly: false });
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
      if (file) {
        await convertToBase64(file);
      }
      navigate('/home');
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
        <TextContent label='Name' name='name' inputRef={nameRef} onChange={handleInputChange} />
        {errors.name && <div className='error'>{errors.name}</div>}

        <div className='form-row'>
          <TextContent
            label='Age'
            name='age'
            type='number'
            min='0'
            inputRef={ageRef}
            className='small-input'
            onChange={handleInputChange}
          />

          <SelectInput
            label='Gender'
            name='gender'
            selectRef={genderRef}
            options={genderOptions}
            className='small-input'
            onChange={handleInputChange}
          />
        </div>
        {errors.age && <div className='error'>{errors.age}</div>}

        <TextContent label='Email' name='email' type='email' inputRef={emailRef} onChange={handleInputChange} />
        {errors.email && <div className='error'>{errors.email}</div>}

        <CountryInput label='Country' name='country' selectRef={countryRef} onChange={handleInputChange} />

        <PasswordInput label='Password' name='password' inputRef={passwordRef} onChange={handleInputChange} />
        {errors.password && <div className='error'>{errors.password}</div>}

        <PasswordInput
          label='Confirm Password'
          name='confirmPassword'
          inputRef={confirmPasswordRef}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <div className='error'>{errors.confirmPassword}</div>}

        <FileInput label='Upload Picture' name='file' inputRef={fileRef} onChange={handleInputChange} />
        {errors.file && <div className='error'>{errors.file}</div>}

        <Checkbox
          label='I accept the Terms and Conditions'
          name='terms'
          inputRef={termsRef}
          onChange={handleInputChange}
        />
        {errors.terms && <div className='error'>{errors.terms}</div>}

        <Button type='submit' text='Sign up' disabled={!isFormTouched || Object.keys(errors).length > 0} />
      </form>
    </main>
  );
};

export default UncontrolledForm;
