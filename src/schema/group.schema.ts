import { object, string, TypeOf, z } from 'zod';

const PermissionEnum = z.enum([
  'READ',
  'WRITE',
  'DELETE',
  'SHARE',
  'UPLOAD_FILES'
]);

const payload = {
  body: object({
    name: string({
      required_error: 'Name is required'
    })
      .min(3, 'Name min 3 char length')
      .max(100, 'Name max 100 char length'),
    permissions: z
      .array(PermissionEnum, {
        required_error: 'Permission is required'
      })
      .nonempty('Should contain at least 1 permission!')
  })
};

const param = {
  params: object({
    id: string({
      required_error: 'groupID is required!'
    })
  })
};

export const createGroupSchema = object({
  ...payload
});

export const getGroupByIdSchema = object({
  ...param
});

export const updateGroupSchema = createGroupSchema.deepPartial();

export type CreateGroupInput = TypeOf<typeof createGroupSchema>;
export type UpdateGroupInput = TypeOf<typeof updateGroupSchema>;
export type GetGroupByIdInput = TypeOf<typeof getGroupByIdSchema>;
export type DeleteGroupInput = TypeOf<typeof getGroupByIdSchema>;
