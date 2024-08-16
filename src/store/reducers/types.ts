export interface Country {
  name: {
    common: string;
    official: string;
  };
}

export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  country: string;
  file: string | ArrayBuffer | null;
}
