export const validateName = (name: string): boolean => /^[A-ZА-Я][a-zа-я]*$/.test(name);

export const validateAge = (age: string): boolean => Number(age) > 0;

export const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);

export const validatePasswords = (password: string, confirmPassword: string): boolean => {
  const passwordStrength = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
  return passwordStrength.test(password) && password === confirmPassword;
};

export const validatePicture = (file: File): boolean => {
  const validExtensions = ['image/jpeg', 'image/png'];
  const maxSize = 2048 * 2048;
  return validExtensions.includes(file.type) && file.size <= maxSize;
};

export const convertToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};
