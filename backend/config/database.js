import { Sequelize } from "sequelize";

const db = new Sequelize('db_nutech', 'root', '',{
    host : 'localhost',
    dialect : 'mysql'
});

export default db;