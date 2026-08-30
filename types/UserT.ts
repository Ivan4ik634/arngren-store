export interface UserT {
  id: number;
  avatar: string;
  name: string;
  email: string;
  role: string;
}

export interface UserLoginT {
  email: string;
  password: string;
}

export interface UserRegisterT {
  name: string;
  email: string;
  password: string;
}
