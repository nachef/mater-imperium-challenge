export interface IUserInfoProps {
  name: string;
  email: string;
  photo: string;
}

export interface UserContextType {
  user: IUserInfoProps | null;
}

export interface UserProviderProps {
  children: React.ReactNode;
}
