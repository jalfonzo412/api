import { Router } from 'express'
import { getAnimals, createAnimal, updateAnimal, deleteAnimal } from '../controllers/animals.controller.js'

const router = Router()

router.get('/animals', getAnimals);

router.get('/animals/:id', getAnimals);

router.post('/animals', createAnimal);

router.put('/animals', updateAnimal);

router.delete('/animals', deleteAnimal);

export default router