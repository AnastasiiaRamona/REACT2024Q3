interface FormValues {
  name: string;
  age: number;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  file: File;
  terms: NonNullable<boolean | undefined>;
}

export default FormValues;
