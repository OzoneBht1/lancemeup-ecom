export interface IUser {
  username: string;
  email: string;
  image: string;
  user_type: string;
}

export interface IUserJsonData extends IUser {
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface ICredentials {
  email: string;
  hashedPassword: string;
}

export interface IProduct {
  id?: number;
  title: string;
  price: number;
  image: File | string;
  description: string;
  category: string;
}

export interface ICart extends IProduct {
  quantity: number;
}
