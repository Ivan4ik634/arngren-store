export const ValidationMessages = {
  NAME_REQUIRED: "Name can't be empty",
  NAME_MIN_LENGTH: 'Name must be at least 3 characters',
  EMAIL_REQUIRED: "Email can't be empty",
  EMAIL_INVALID: 'Invalid email address',
  PASSWORD_REQUIRED: "Password can't be empty",
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',
  CONFIRM_PASSWORD_REQUIRED: 'Please confirm your password',
  CONFIRM_PASSWORD_MISMATCH: 'Passwords do not match',
  AGREE_REQUIRED: 'Please agree to the terms of service',
} as const;
