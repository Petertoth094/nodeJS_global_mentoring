import { nanoid } from 'nanoid';
import lodash from 'lodash';

import User from '../model/user.model';
import { CreateUserInput, UpdateUserInput } from '../schema/user.schema';
import {
  getUsersFromFile,
  writeUsersToFile
} from '../utils/usersFileOperatons';

export async function createUser(input: CreateUserInput['body']) {
  try {
    // const filePath = path.join(__dirname, "..", "utils", "users.json");
    // const data = await fs.readFile(filePath, "utf-8");
    // const users: User[] = await JSON.parse(data);
    const users: User[] = await getUsersFromFile();

    const foundUser = users.find((user) => user.login === input.login);

    if (foundUser) return null;

    const newUser: User = {
      id: nanoid(),
      login: input.login,
      password: input.password,
      age: input.age,
      isDeleted: false
    };
    users.push(newUser);

    // await fs.writeFile(filePath, JSON.stringify(users))
    await writeUsersToFile(users);

    return lodash.omit(newUser, ['password']);
  } catch (error: any) {
    console.log('CreateUser error', error);
  }
}

export async function getUsers() {
  try {
    const users: User[] = await getUsersFromFile();

    return users.map((user) => lodash.omit(user, ['password']));
  } catch (error) {
    console.log(error);
  }
}

export async function getUserById(query: string) {
  try {
    const users: User[] = await getUsersFromFile();

    // eslint-disable-next-line no-shadow
    const user = users.find((user) => user.id === query);
    if (!user) {
      return null;
    }
    return lodash.omit(user, ['password']);
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(
  query: string,
  update: Partial<UpdateUserInput['body']>
) {
  try {
    const users: User[] = await getUsersFromFile();

    const foundUser = users.find((user) => user.id === query);

    if (foundUser) {
      const updatedUsers = users.map((user) => {
        if (user.id === query) {
          return {
            ...user,
            ...update
          };
        }
        return user;
      });
      await writeUsersToFile(updatedUsers);
      return lodash.omit(
        {
          ...foundUser,
          ...update
        },
        ['password']
      );
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function getAutoSuggestUsers(loginSubstring = '', limit = 3) {
  try {
    const users: User[] = await getUsersFromFile();

    const suggestedUsers = users
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
      return null;
    }
    return suggestedUsers.map((user) => lodash.omit(user, ['password']));
  } catch (error) {
    console.log(error);
  }
}

export async function removeUser(query: string) {
  try {
    const users: User[] = await getUsersFromFile();

    const foundUser = users.find((user) => user.id === query);

    if (foundUser) {
      const updatedUsers = users.map((user) => {
        if (user.id === query) {
          return {
            ...user,
            isDeleted: true
          };
        }
        return user;
      });
      await writeUsersToFile(updatedUsers);
      return lodash.omit(
        {
          ...foundUser,
          isDeleted: true
        },
        ['password']
      );
    }

    return null;
  } catch (error) {
    console.log(error);
  }
}
