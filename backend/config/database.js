import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";

const db = new Sequelize('db_nutech', '9r7yudm16p3fv8uj6fem', 'pscale_pw_TIGkn9KTBxE4sJHaKf0ggnclGfxu2lmktqFiYQVAkUm',{
    host : 'aws.connect.psdb.cloud',
    dialect : 'mysql',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

export default db;