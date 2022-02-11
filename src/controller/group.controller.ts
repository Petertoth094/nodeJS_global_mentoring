import { Request, Response } from 'express';

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

import logger from '../utils/logger';

export async function createGroupHandler(
  req: Request<{}, {}, CreateGroupInput['body']>,
  res: Response
) {
  try {
    const body = req.body;

    const createdGroup: GroupModel = await createGroup(body);

    return res.status(200).json({
      successful: true,
      result: {
        createdGroup
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function getGroupsHandler(req: Request, res: Response) {
  try {
    const groups: GroupModel[] = await getGroups();

    return res.status(200).json({
      successful: true,
      result: {
        groups
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function getGroupByIdHandler(
  req: Request<GetGroupByIdInput['params']>,
  res: Response
) {
  try {
    const groupID: string = req.params.id;

    const foundGroup: GroupModel | null = await getGroupById(groupID);
    if (!foundGroup) {
      return res.status(400).json({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).json({
      successful: true,
      result: {
        foundGroup
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function updateGroupHandler(
  req: Request<GetGroupByIdInput['params'], {}, UpdateGroupInput['body']>,
  res: Response
) {
  try {
    const groupID: string = req.params.id;
    const updateParams = req.body;

    const updatedGroup: GroupModel | null = await updateGroup(
      groupID,
      updateParams
    );

    if (!updatedGroup) {
      return res.status(400).json({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).json({
      successful: true,
      result: {
        updatedGroup
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function deleteGroupHandler(
  req: Request<DeleteGroupInput['params']>,
  res: Response
) {
  try {
    const groupID: string = req.params.id;

    const success: boolean = await deleteGroup(groupID);

    if (!success) {
      return res.status(400).json({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }

    return res.status(200).send('Group deleted');
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}

export async function addUsersToGroupHandler(
  req: Request<GetGroupByIdInput['params'], {}, { userIDs: string[] }>,
  res: Response
) {
  try {
    const groupID: string = req.params.id;
    const userIDs: string[] = req.body.userIDs;

    const updatedGroup: GroupModel | null = await addUsersToGroupService(
      groupID,
      userIDs
    );

    if (!updatedGroup) {
      return res.status(200).json({
        successful: false,
        error: `No group found with id: ${groupID}`
      });
    }
    return res.status(200).json({
      successful: true,
      result: {
        updatedGroup
      }
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(400).json({
      successful: false,
      error: err?.message
    });
  }
}
