import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from './config/config.js';
import { sequelize } from './sequelize.js';
import multer from 'multer';
import XLSX from 'xlsx';
import { Student } from './models/Student.js';
import bcrypt from 'bcrypt';
import { User } from './models/User.js';
import jwt from 'jsonwebtoken'; // Import JWT
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Directory where files are stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// User Signup
app.post('/api/signup', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).send({ error: 'All fields are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).send({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Email already exists' });
    } else {
      res.status(500).send({ error: 'Error creating user' });
    }
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email and Password are required' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).send({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).send({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
});

// File Upload and Data Handling
app.post('/api/upload', upload.single('file'), async (req, res) => {
  console.log('Received file:', req.file);
  console.log('Received semester:', req.body.semester);

  const file = req.file;
  const semester = req.body.semester;

  if (!file || !semester) {
    return res.status(400).send('No file uploaded or semester not selected.');
  }

  try {
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    console.log('Worksheet data:', worksheet);

    const students = worksheet.map((row) => ({
      s_no: row['s_no'],
      roll_no: row['roll_no'],
      name: row['name'],
      father_name: row['father_name'],
      semester
    }));

    console.log('Students data:', students);

    await Student.bulkCreate(students);
    res.status(200).send('File uploaded and data saved to database.');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Error processing file.');
  }
});

// Get Students by Semester
app.get('/api/students', async (req, res) => {
  const { semester } = req.query;

  if (!semester) {
    return res.status(400).send('Semester is required');
  }

  try {
    const students = await Student.findAll({ where: { semester } });
    res.status(200).json(students);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching student data');
  }
});

// Attendance
app.post('/api/attendance', async (req, res) => {
  const { date, semester, students } = req.body;

  if (!date || !semester || !students) {
    return res.status(400).send('Missing required fields');
  }

  try {
    for (const student of students) {
      await Attendance.create({
        date,
        semester,
        studentId: student.id,
        present: student.present
      });
    }
    res.status(200).send('Attendance data saved successfully');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving attendance data');
  }
});

// Database connection and server start
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(config.PORT, () => {
      console.log(`Server started on port ${config.PORT}`); // Use backticks for template literals
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
};

start();
