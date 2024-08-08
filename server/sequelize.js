// server/src/sequelize.js
import { Sequelize } from 'sequelize';
import { config } from './config/config.js';

const sequelize = new Sequelize(config.DB_URL, {
    dialect: 'postgres',
    logging: false,
});

export { sequelize };
