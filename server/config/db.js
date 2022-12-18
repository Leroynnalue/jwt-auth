import {
    Sequelize
} from "sequelize"
import dotenv from 'dotenv';
import colors from "colors"

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.'.bgGreen);
    } catch (error) {
        console.error('Unable to connect to the database:'.bgRed, error);
    }
}

export default sequelize;