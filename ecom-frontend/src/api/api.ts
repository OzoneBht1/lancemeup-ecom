import { ICredentials, IUserJsonData } from "../types/types";

export const isValidCredentials = async <TData>(
  credentials: ICredentials
): Promise<TData | null> => {
  // implementing GET request instead of POST because JSON Server cannot validate password
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();
  const user = users.find(
    (user: IUserJsonData) =>
      user.email === credentials.email &&
      user.password === credentials.hashedPassword
  );
  return user ? user : null;
};
