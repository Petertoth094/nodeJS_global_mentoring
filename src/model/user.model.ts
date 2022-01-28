type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export default interface User {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
  // eslint-disable-next-line semi
}

export type UserView = Optional<User, 'password'>;
