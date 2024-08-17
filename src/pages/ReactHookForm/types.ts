interface FormValues {
  name: string;
  age: number;
  gender: string;
  email: string;
  country: string;
  password: string;
  confirmPassword: string;
  file: File;
  terms: NonNullable<boolean | undefined>;
}

export default FormValues;
