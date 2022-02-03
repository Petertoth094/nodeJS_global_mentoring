import { nanoid } from 'nanoid';

import User, { UserView } from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';

import usersJSON from '../utils/users';

let users: User[] = JSON.parse(JSON.stringify(usersJSON));

export async function createUser(
  input: CreateUserInput['body']
): Promise<User | undefined> {
  try {
    const foundUser: User | undefined = users.find(
      (user) => user.login === input.login
    );

    if (foundUser) {
      return undefined;
    }

    const newUser: User = {
      id: nanoid(),
      login: input.login,
      password: input.password,
      age: input.age,
      isDeleted: false
    };
    users.push(newUser);

    return newUser;
  } catch (error: any) {
    console.log('CreateUser error', error);
  }
}

export async function getUsers(): Promise<UserView[] | undefined> {
  try {
    return users.map((user: UserView) => {
      delete user?.password;

      return user;
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(
  paramID: string
): Promise<UserView | undefined> {
  try {
    const foundUser: UserView | undefined = users.find(
      (user) => user.id === paramID
    );
    if (!foundUser) {
      return undefined;
    }
    delete foundUser.password;

    return foundUser;
  } catch (error) {
    console.log(error);
  }
}

export async function getAutoSuggestUsers(
  loginSubstring = '',
  limit = 3
): Promise<UserView[] | undefined> {
  try {
    const suggestedUsers: User[] = users
      .filter((user) => user.login.includes(loginSubstring))
      .sort((a, b) => {
        const nameA = a.login.toLocaleUpperCase();
        const nameB = b.login.toLocaleUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      })
      .slice(0, limit);

    if (suggestedUsers.length === 0) {
      return undefined;
    }
    return suggestedUsers.map((user: UserView) => {
      delete user?.password;
      return user;
    });
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  queryID: string,
  update: UpdateUserInput['body']
): Promise<UserView | undefined> {
  try {
    const foundUser: UserView | undefined = users.find(
      (user) => user.id === queryID
    );

    if (foundUser) {
      users = users.map((user) => {
        if (user.id === queryID) {
          return {
            ...user,
            ...update
          };
        }
        return user;
      });

      const updatedUser: UserView = { ...foundUser, ...update };

      delete updatedUser.password;

      return updatedUser;
    }

    return undefined;
  } catch (error) {
    console.log(error);
  }
}

export async function removeUser(query: string): Promise<UserView | undefined> {
  try {
    const foundUser: UserView | undefined = users.find(
      (user) => user.id === query
    );

    if (foundUser) {
      users = users.map((user) => {
        if (user.id === query) {
          return {
            ...user,
            isDeleted: true
          };
        }
        return user;
      });

      const removedUser: UserView = { ...foundUser, isDeleted: true };

      delete removedUser.password;

      return removedUser;
    }

    return undefined;
  } catch (error) {
    console.log(error);
  }
}
