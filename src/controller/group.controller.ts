import { NextFunction, Request, Response } from 'express';

import { GroupModel } from '../model/group.model';
import {
  CreateGroupInput,
  DeleteGroupInput,
  GetGroupByIdInput,
  UpdateGroupInput
} from '../schema/group.schema';

import {
  addUsersToGroupService,
  createGroup,
  deleteGroup,
  getGroupById,
  getGroups,
  updateGroup
} from '../service/group.service';

import Logger from '../utils/logger';

export async function createGroupHandler(
  req: Request<{}, {}, CreateGroupInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const createdGroup: GroupModel = await createGroup(body);

    return res.status(201).send({
      successful: true,
      result: {
        createdGroup
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      createGroupHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function getGroupsHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const groups: GroupModel[] = await getGroups();

    return res.status(200).send({
      successful: true,
      result: {
        groups
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      getGroupsHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function getGroupByIdHandler(
  req: Request<GetGroupByIdInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const groupID: string = req.params.id;

    const foundGroup: GroupModel | null = await getGroupById(groupID);
    if (!foundGroup) {
      return res.status(404).send({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).send({
      successful: true,
      result: {
        foundGroup
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      getGroupByIdHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function updateGroupHandler(
  req: Request<GetGroupByIdInput['params'], {}, UpdateGroupInput['body']>,
  res: Response,
  next: NextFunction
) {
  try {
    const groupID: string = req.params.id;
    const updateParams = req.body;

    const updatedGroup: GroupModel | null = await updateGroup(
      groupID,
      updateParams
    );

    if (!updatedGroup) {
      return res.status(404).send({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).send({
      successful: true,
      result: {
        updatedGroup
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      updateGroupHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function deleteGroupHandler(
  req: Request<DeleteGroupInput['params']>,
  res: Response,
  next: NextFunction
) {
  try {
    const groupID: string = req.params.id;

    const success: boolean = await deleteGroup(groupID);

    if (!success) {
      return res.status(404).send({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).send('Group deleted');
  } catch (err: any) {
    err.message = `Method: ${
      deleteGroupHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}

export async function addUsersToGroupHandler(
  req: Request<GetGroupByIdInput['params'], {}, { userIDs: string[] }>,
  res: Response,
  next: NextFunction
) {
  try {
    const groupID: string = req.params.id;
    const userIDs: string[] = req.body.userIDs;

    const updatedGroup: GroupModel | null = await addUsersToGroupService(
      groupID,
      userIDs
    );

    if (!updatedGroup) {
      return res.status(404).send({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }
    return res.status(200).send({
      successful: true,
      result: {
        updatedGroup
      }
    });
  } catch (err: any) {
    err.message = `Method: ${
      addUsersToGroupHandler.name
    } - Arguments: ${JSON.stringify({
      ...req.body,
      ...req.params
    })} - Message: ${err}`;
    Logger.error(err);
    return next(err);
  }
}
