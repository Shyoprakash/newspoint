import express from 'express'
import { fetchNewsByCategory, Preferences } from '../controllers/newsController.js';


const newRoutes = express.Router();


newRoutes.post('/preferences/:id', Preferences)
newRoutes.get('/news/:category', fetchNewsByCategory)

export default newRoutes