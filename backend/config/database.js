import * as dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from "sequelize";

const db = new Sequelize('db_nutech', 'iv18e5ke5aqpq5sj16tw', 'pscale_pw_hnjvoImX02OPntuQz51ITmCNmCkp6d5Utf0R7dt41Jl',{
    host : 'aws.connect.psdb.cloud',
    dialect : 'mysql',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

export default db;