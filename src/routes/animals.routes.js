import { Router } from 'express'
import { getAnimals, createAnimals, updateAnimals, deleteAnimals } from '../controllers/animals.controller.js'

const router = Router()

router.get('/animals', getAnimals);

router.post('/animals', createAnimals);

router.put('/animals', updateAnimals);

router.delete('/animals', deleteAnimals);

export default router