// import dotenv from 'dotenv';

// dotenv.config();

// export default {
//   port: process.env.PORT || 3000,
//   logLevel: process.env.LOG_LEVEL || 'info',
//   databaseParams: {
//     dbDialect: process.env.DB_DIALECT,
//     dbHost: process.env.DB_HOST,
//     dbPort: process.env.DB_PORT,
//     dbUsername: process.env.DB_USERNAME,
//     dbPassword: process.env.DB_PASSWORD,
//     dbDatabase: process.env.DB_DATABASE
//   },
//   publicKey: process.env.JWT_PUBLIC_KEY,
//   privateKey: process.env.JWT_SECRET_KEY
// };

export default {
  port: 3000,
  logLevel: 'info',
  databaseParams: {
    dbDialect: 'postgres',
    dbHost: 'ec2-54-228-95-1.eu-west-1.compute.amazonaws.com',
    dbPort: 5432,
    dbUsername: 'rsucmwsckdeihx',
    dbPassword:
      'fa17fe3a1eebeece2c500063fbbb8f36ddcbb3ea862349273ebf44cca98374b5',
    dbDatabase: 'd5eto4dk2kc6pl'
  },
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJAd4zVxHiqEeZiGhskQO1qTTWXUiw4E/ZOUQWJeRfTjsxboSiw1zCp
avTMuAJRwxZ4S4MA2rdSgOzY9Qf1/0GCgwIDAQABAkAIFL8GbtmgKCCNfzQuJ14+
Jdc6uL55qvaUR3mJc/DbACGCg/fWtOpwCEuSQsPPhPBkXcrVfMVFpl3+GT5LxmCB
AiEAxnyG0XOytGqvu9BCyF0kv8kVqCFpIQrNp++sXXmZ0+MCIQCaMOnbEsbRshkr
kjPqz+I9HWdEbJYJkENFkQRt0NsY4QIhAK7E80j2IQJvdjFfnY4jRbqBaspSMOlh
Q9h9Vz4vVl2VAiAfx90rrl8UcaUGeggBaf+zoQ/b5pW2OuniuNU03UuLgQIhALQq
FOB1H4tv/7hDQuLyQkWcqZg62gO81UonNBP2v9p9
-----END RSA PRIVATE KEY-----`,
  publicKey: `-----BEGIN PUBLIC KEY-----
MFswDQYJKoZIhvcNAQEBBQADSgAwRwJAd4zVxHiqEeZiGhskQO1qTTWXUiw4E/ZO
UQWJeRfTjsxboSiw1zCpavTMuAJRwxZ4S4MA2rdSgOzY9Qf1/0GCgwIDAQAB
-----END PUBLIC KEY-----`
};
