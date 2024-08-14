export type AuthData = {
  email: string;
  password: string;
};

export type ValidationError = {
  property: string;
  value: string;
  messages: string[];
};

export type AuthError = {
  errorType: string;
  message: string;
  details: ValidationError[];
};
