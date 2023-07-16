import { Sequelize } from "sequelize";

const db = new Sequelize('db_nutech', 'r5m1vuz4jfrbb6jdb0xu', 'pscale_pw_L7KwinP9UqliPmQsjuoxalG3PiBeDWRGQNaSaSFQFcZ',{
    host : 'aws.connect.psdb.cloud',
    dialect : 'mysql',
    dialectOptions:{
        ssl: {
            rejectUnauthorized: true,
        }
    }
});

export default db;