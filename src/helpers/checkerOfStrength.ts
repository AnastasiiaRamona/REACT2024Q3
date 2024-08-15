const getStrength = (password: string) => {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;"'<>,.?~\\/-]/.test(password);

  if (hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar) return 4;
  if (hasUpperCase && hasLowerCase && (hasNumber || hasSpecialChar)) return 3;
  if (hasUpperCase || hasLowerCase) return 2;
  return 1;
};

export default getStrength;
