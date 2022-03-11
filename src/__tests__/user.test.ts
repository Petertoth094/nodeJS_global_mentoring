import supertest from 'supertest';

import { app } from '../app';
import { sequelize } from '../data-access/dbConnect';
import { signJWT } from '../utils/jwt.utils';

import * as UserServices from '../service/user.service';
import * as UserControllers from '../controller/user.controller';

import { ConflictError } from '../errors';

import { users } from '../utils/users';

const userResp = {
  id: '6a178c97-76ba-4d2e-80f0-a9fa9cdc0b3e',
  login: 'almos',
  password: 'asdQWE123',
  age: 25,
  isDeleted: false
};

const userPayload = {
  login: 'almos',
  age: 25
};

jest.mock('../utils/logger');

describe('getUserByIdHandler controller function', () => {
  describe('given the req.params.id is wrong', () => {
    it('should return  404 No user found', async () => {
      jest
        .spyOn(UserServices, 'getUserById')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(null);

      const req = {
        params: {
          id: 'user-123'
        }
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const next = jest.fn();

      await UserControllers.getUserByIdHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        successful: false,
        error: expect.any(String)
      });
    });
  });

  describe('given the req.params.id is correct', () => {
    it('should return  200 with success user object', async () => {
      jest
        .spyOn(UserServices, 'getUserById')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(userResp);

      const req = {
        params: {
          id: userResp.id
        }
      };

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const next = jest.fn();

      await UserControllers.getUserByIdHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        successful: true,
        result: {
          foundUser: userResp
        }
      });
    });
  });
});

describe('createUserHandler controller function', () => {
  describe('given the req.body is wrong', () => {
    it('should return  409 Conflict error', async () => {
      jest
        .spyOn(UserServices, 'createUser')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockRejectedValue(new ConflictError('User already exists'));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        body: {}
      };

      const next = jest
        .fn()
        .mockReturnValue({ succesfull: false, status: 409 });

      const response = await UserControllers.createUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(response).toEqual({
        succesfull: false,
        status: 409
      });
    });
  });

  describe('given the req.body is correct', () => {
    it('should return  201 with success object', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(UserServices, 'createUser').mockReturnValue(userResp);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const next = jest.fn();

      const req = {
        body: { ...userPayload, password: 'asdQWE123' }
      };

      await UserControllers.createUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({
        successful: true,
        result: {
          createdUser: userResp
        }
      });
    });
  });
});

describe('getGroupsHandler controller function', () => {
  it('should return groups array', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(UserServices, 'getUsers').mockReturnValue([userResp]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = {
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn(() => res)
    };

    const next = jest.fn();

    const req = jest.fn();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    await UserControllers.getUsersHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toBeCalledWith({
      successful: true,
      result: {
        users: [userResp]
      }
    });
  });
});

describe('updateUserHandler controller function', () => {
  describe('given the req.query is wrong and no user found', () => {
    it('should return 404 No user found', async () => {
      jest
        .spyOn(UserServices, 'updateUser')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(null);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: 'user-123'
        }
      };

      const next = jest.fn();

      await UserControllers.updateUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        successful: false,
        error: `No user found with id: ${req.params.id}`
      });
    });
  });
  describe('given the req.query is correct', () => {
    it('should return 200 updated group', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: userResp.id
        },
        body: userResp
      };

      const next = jest.fn();

      jest
        .spyOn(UserServices, 'updateUser')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(userResp);

      await UserControllers.updateUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        successful: true,
        result: {
          updatedUser: userResp
        }
      });
    });
  });
});

describe('removeUserHandler controller function', () => {
  describe('given the req.query is wrong and no user found', () => {
    it('should return 404 No group found', async () => {
      jest
        .spyOn(UserServices, 'removeUser')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(null);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: 'user-123'
        }
      };

      const next = jest.fn();

      await UserControllers.removeUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        successful: false,
        error: `No user found with id: ${req.params.id}`
      });
    });
  });
  describe('given the req.query is correct', () => {
    it('should return 200 removed user', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: userResp.id
        },
        body: userResp
      };

      const next = jest.fn();

      jest
        .spyOn(UserServices, 'removeUser')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue({ ...userResp, isDeleted: true });

      await UserControllers.removeUserHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        successful: true,
        result: {
          removedUser: { ...userResp, isDeleted: true }
        }
      });
    });
  });
});

describe('get users route', () => {
  describe('given the user is logged in', () => {
    it('should return 200 and return the user', async () => {
      jest.mock('../model/user.model');
      jest.mock('../model/group.model');
      const jwt = signJWT({ name: 'asd', age: 30 }, '30m');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(sequelize, 'transaction').mockResolvedValue(users);

      const { statusCode, body } = await supertest(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${jwt}`);

      expect(statusCode).toBe(200);
      expect(body.successful).toBe(true);
      expect(body.result).toStrictEqual({
        users
      });
    });
  });
});

describe('create users route', () => {
  const newUser = {
    id: '6a178c97-76ba-4d2e-80f0-a9fa9cdc0b3e',
    login: 'newUser',
    password: 'asdQWE123',
    age: 100,
    isDeleted: false
  };
  describe('given the user is logged in', () => {
    it('should return 201 and return the new user', async () => {
      jest.mock('../model/user.model');
      jest.mock('../model/group.model');
      const jwt = signJWT({ name: 'asd', age: 30 }, '30m');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(sequelize, 'transaction').mockResolvedValue(newUser);

      const { statusCode, body } = await supertest(app)
        .post('/api/users')
        .set('Authorization', `Bearer ${jwt}`)
        .send({
          login: newUser.login,
          password: newUser.password,
          age: newUser.age
        });

      expect(statusCode).toBe(201);
      expect(body.successful).toBe(true);
      expect(body.result).toStrictEqual({
        createdUser: newUser
      });
    });
  });
});
