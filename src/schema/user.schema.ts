import { object, string, number, TypeOf } from 'zod';

const payload = {
  body: object({
    login: string({
      required_error: 'Login is required'
    }),
    password: string({
      required_error: 'Password is required'
    }).regex(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      'password must contain at least 1 lowerCase + upperCase letter + number'
    ),
    age: number({
      required_error: 'Age is required'
    })
      .min(4, 'Age is min 4')
      .max(130, 'Age is max 130')
  })
};

const paramsID = {
  params: object({
    id: string({
      required_error: 'userID is required!'
    })
  })
};

// const paramsLogin = {
//   params: object({
//     login: string({
//       required_error: 'userLogin is required!'
//     })
//   })
// };

export const createUserSchema = object({
  ...payload
});

export const updateUserSchema = object({
  ...payload,
  ...paramsID
});

export const getUserByIdSchema = object({
  ...paramsID
});

export const deleteUserSchema = object({
  ...paramsID
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserByIdInput = TypeOf<typeof getUserByIdSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;

/**
 * regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
 */
