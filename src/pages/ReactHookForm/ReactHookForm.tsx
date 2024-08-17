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
import { useEffect } from 'react';
import convertToBase64 from '../../helpers/converterToBase64';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../store/reducers/countriesSlice';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { setFormData } from '../../store/reducers/formSlice';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from '../../store/store';
import FormValues from './types';

const ReactHookForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<string[], void, Action>>();
  const countries = useSelector((state: RootState) => state.countries.countries);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema(countries)),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    let fileBase64: string | ArrayBuffer | null = null;

    const file = data.file;

    if (file) {
      fileBase64 = await convertToBase64(file);
    }

    const formValues = {
      ...data,
      file: fileBase64,
    };
    dispatch(setFormData(formValues));
    navigate('/home');
  };

  return (
    <main>
      <Navigation />
      <form onSubmit={handleSubmit(onSubmit)} className='hook-form'>
        <Controller name='name' control={control} render={({ field }) => <TextContent label='Name' {...field} />} />
        {errors.name && <div className='error'>{errors.name.message}</div>}

        <div className='form-row'>
          <Controller
            name='age'
            control={control}
            render={({ field }) => <TextContent label='Age' type='number' min='0' {...field} className='small-input' />}
          />

          <SelectInput label='Gender' options={genderOptions} className='small-input' />
        </div>
        {errors.age && <div className='error'>{errors.age.message}</div>}

        <Controller
          name='email'
          control={control}
          render={({ field }) => <TextContent label='Email' type='email' {...field} />}
        />
        {errors.email && <div className='error'>{errors.email.message}</div>}

        <Controller
          name='country'
          control={control}
          render={({ field }) => <CountryInput label='Country' {...field} />}
        />
        {errors.country && <div className='error'>{errors.country.message}</div>}

        <Controller
          name='password'
          control={control}
          render={({ field }) => <PasswordInput label='Password' {...field} />}
        />
        {errors.password && <div className='error'>{errors.password.message}</div>}

        <Controller
          name='confirmPassword'
          control={control}
          render={({ field }) => <PasswordInput label='Confirm Password' {...field} />}
        />
        {errors.confirmPassword && <div className='error'>{errors.confirmPassword.message}</div>}

        <Controller
          name='file'
          control={control}
          render={({ field }) => (
            <FileInput
              label='Upload Picture'
              {...field}
              onChange={(e) => field.onChange((e.target as HTMLInputElement).files?.[0])}
            />
          )}
        />
        {errors.file && <div className='error'>{errors.file.message}</div>}

        <Controller
          name='terms'
          control={control}
          render={({ field }) => <Checkbox label='I accept the Terms and Conditions' {...field} />}
        />
        {errors.terms && <div className='error'>{errors.terms.message}</div>}

        <Button type='submit' text='Sign up' disabled={!isDirty || !isValid || isSubmitting} />
      </form>
    </main>
  );
};

export default ReactHookForm;
