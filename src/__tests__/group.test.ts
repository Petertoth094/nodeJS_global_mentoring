import * as GroupControllers from '../controller/group.controller';
import * as GroupServices from '../service/group.service';
import { ConflictError } from '../errors';

jest.mock('../utils/logger');

const groupResp = {
  id: 'd03a0cb3-9a1e-4f9c-94b4-ceaef389e986',
  name: 'ADMINS',
  permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
};

describe('getGroupByIdHandler controller function', () => {
  describe('given the req.params.id is wrong', () => {
    it('should return  404 No group found', async () => {
      jest
        .spyOn(GroupServices, 'getGroupById')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(null);

      const req = {
        params: {
          id: 'group-123'
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

      await GroupControllers.getGroupByIdHandler(
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
    it('should return  200 with success group object', async () => {
      jest
        .spyOn(GroupServices, 'getGroupById')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(groupResp);

      const req = {
        params: {
          id: groupResp.id
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

      await GroupControllers.getGroupByIdHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        successful: true,
        result: expect.any(Object)
      });
    });
  });
});

describe('createGroupHandler controller function', () => {
  describe('given the req.body is wrong', () => {
    it('should return  409 Conflict error', async () => {
      jest
        .spyOn(GroupServices, 'createGroup')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockRejectedValue(new ConflictError('Group already exists'));

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

      const response = await GroupControllers.createGroupHandler(
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
      jest.spyOn(GroupServices, 'createGroup').mockReturnValue(groupResp);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const next = jest.fn();

      const req = {
        body: {
          name: 'ADMINS',
          permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
        }
      };

      await GroupControllers.createGroupHandler(
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
          createdGroup: groupResp
        }
      });
    });
  });
});

describe('getGroupsHandler controller function', () => {
  const localGroups = [
    {
      id: 'd03a0cb3-9a1e-4f9c-94b4-ceaef389e986',
      name: 'ADMINS',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
      id: '7699eb52-289d-4d92-84dc-4a051386d52d',
      name: 'LAJOSOK',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    },
    {
      id: '51b5c4d6-cc7c-4f15-bb1c-23f2d22ac5fb',
      name: 'HONFOGLALOK',
      permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
    }
  ];

  it('should return groups array', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(GroupServices, 'getGroups').mockReturnValue(localGroups);

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
    await GroupControllers.getGroupsHandler(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toBeCalledWith({
      successful: true,
      result: {
        groups: localGroups
      }
    });
  });
});

describe('updateGroupHandler controller function', () => {
  describe('given the req.query is wrong and no group found', () => {
    it('should return 404 No group found', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(GroupServices, 'updateGroup').mockReturnValue(null);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: 'group-123'
        }
      };

      const next = jest.fn();

      await GroupControllers.updateGroupHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        successful: false,
        error: `No group found with id: ${req.params.id}`
      });
    });
  });
  describe('given the req.query is correct', () => {
    const outDatedGroup = {
      id: '06aae315-4152-471a-a3c3-da14783a1d04',
      name: 'USERS',
      permissions: ['READ']
    };
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
          id: '06aae315-4152-471a-a3c3-da14783a1d04'
        },
        body: {
          name: 'USERS',
          permissions: ['READ', 'WRITE']
        }
      };

      const next = jest.fn();

      jest
        .spyOn(GroupServices, 'updateGroup')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          id: '06aae315-4152-471a-a3c3-da14783a1d04',
          name: 'USERS',
          permissions: ['READ', 'WRITE']
        });

      await GroupControllers.updateGroupHandler(
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
          updatedGroup: { ...outDatedGroup, ...req.body }
        }
      });
    });
  });
});

describe('deleteGroupHandler controller function', () => {
  describe('given the req.query is wrong and no group found', () => {
    it('should return 404 No group found', async () => {
      jest
        .spyOn(GroupServices, 'deleteGroup')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(false);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: 'group-123'
        }
      };

      const next = jest.fn();

      await GroupControllers.deleteGroupHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({
        successful: false,
        error: `No group found with id: ${req.params.id}`
      });
    });
  });
  describe('given the req.query is correct', () => {
    it('should return 200  group deleted', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const res = {
        send: jest.fn(),
        json: jest.fn(),
        status: jest.fn(() => res)
      };

      const req = {
        params: {
          id: '06aae315-4152-471a-a3c3-da14783a1d04'
        }
      };

      const next = jest.fn();

      jest
        .spyOn(GroupServices, 'deleteGroup')
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .mockReturnValue(true);

      await GroupControllers.deleteGroupHandler(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req,
        res,
        next
      );

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith('Group deleted');
    });
  });
});
