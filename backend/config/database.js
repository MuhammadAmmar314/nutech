import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";

const db = new Sequelize(process.env.database, process.env.username, process.env.password,{
    host : process.env.host,
    dialect : 'mysql',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

export default db;