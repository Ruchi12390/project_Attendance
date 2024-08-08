// server.js
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config/config.js';
import { sequelize } from './models/index.js';
import uploadRoutes from './routers/uploadRoutes.js';
import multer from 'multer';
import XLSX from 'xlsx';

const app = express();
