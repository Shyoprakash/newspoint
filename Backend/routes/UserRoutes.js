import express from 'express';
import { register } from '../controllers/authController.js'; 

const userRoutes = express.Router();

userRoutes.post('/register', register)

export default userRoutes ;
