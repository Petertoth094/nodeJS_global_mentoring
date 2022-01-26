import path from 'path';
import fs from 'fs/promises';
import User from '../model/user.model';

export const getUsersFromFile = async () => {
  try {
    const filePath = path.join(__dirname, 'users.json');

    const data = await fs.readFile(filePath, 'utf-8');
    const users = await JSON.parse(data);

    return users;
  } catch (error) {
    console.log(error);
  }
};

export const writeUsersToFile = async (users: User[]) => {
  try {
    const filePath = path.join(__dirname, 'users.json');

    await fs.writeFile(filePath, JSON.stringify(users));

    return Promise.resolve('Successfully updated file');
  } catch (error) {
    console.log(error);
  }
};
