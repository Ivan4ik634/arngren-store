import { LucideIcon } from 'lucide-react';

export interface UserT {
  id: string;
  avatar: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  language: string;
  email: string;
  role: string;
  created_at: string;
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

export interface UserUpdateT extends Omit<UserRegisterT, 'password'> {
  avatar: string;
}
export interface UserUpdatePersonalInformationT extends Partial<
  Omit<UserT, 'password' | 'id' | 'dateOfBirth'>
> {
  dateOfBirth?: Date;
}
export interface PersonalInformationItemT {
  icon: LucideIcon;
  title: string;
  info: string;
}
