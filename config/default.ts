 import dotenv from 'dotenv';

 dotenv.config();

 export default {
   port: process.env.PORT || 3000,
   logLevel: process.env.LOG_LEVEL || 'info',
   databaseParams: {
     dbDialect: process.env.DB_DIALECT,
     dbHost: process.env.DB_HOST,
     dbPort: process.env.DB_PORT,
     dbUsername: process.env.DB_USERNAME,
     dbPassword: process.env.DB_PASSWORD,
     dbDatabase: process.env.DB_DATABASE
   },
   publicKey: process.env.JWT_PUBLIC_KEY,
   privateKey: process.env.JWT_SECRET_KEY
 };
