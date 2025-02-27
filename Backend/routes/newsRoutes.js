import express from 'express'
import { Preferences } from '../controllers/newsController.js';


const newRoutes = express.Router();


newRoutes.post('/preferences/:id', Preferences)

export default newRoutes