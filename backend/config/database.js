import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";

const db = new Sequelize('db_nutech', process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD,{
    host : process.env.DATABASE_HOST,
    dialect : 'mysql',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

export default db;