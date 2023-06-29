import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const Product = db.define('products',{
    product_image: DataTypes.STRING,
    product_name: {
                        type: DataTypes.STRING,
                        allowNull: false,
                        unique: true
                    },
    url: DataTypes.STRING,
    buy_price: DataTypes.DECIMAL(10,2),
    sell_price: DataTypes.DECIMAL(10,2),
    stock: DataTypes.INTEGER
},{
    freezeTableName : true
});

export default Product;

(async()=>{
    await db.sync();
})();