export const users = [
  {
    id: '089d02bd-d1ce-4be2-82c0-b63c4742b975',
    login: 'elod',
    password: 'asdQWE123',
    age: 25,
    isDeleted: false
  },
  {
    id: 'ea043bfb-7b51-4036-b3ac-2410a2dacb8f',
    login: 'janoska',
    password: 'asdQWE123',
    age: 25,
    isDeleted: false
  },
  {
    id: '7ccf884d-6433-44c9-9077-6dd2c74440dc',
    login: 'norman',
    password: 'asdQWE123',
    age: 40,
    isDeleted: false
  }
];

export const groups = [
  {
    id: 'd03a0cb3-9a1e-4f9c-94b4-ceaef389e986',
    name: 'ADMINS',
    permissions: ['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']
  },
  {
    id: '06aae315-4152-471a-a3c3-da14783a1d04',
    name: 'USERS',
    permissions: ['READ']
  },
  {
    id: 'bb95a0b0-07e1-45e3-a02a-6f2f7298dd89',
    name: 'PETIK',
    permissions: ['READ', 'WRITE', 'DELETE', 'UPLOAD_FILES']
  }
];
