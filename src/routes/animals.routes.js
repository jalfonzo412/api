import { Router } from 'express'
import { getAnimals, getAnimal, createAnimal, updateAnimal, deleteAnimal } from '../controllers/animals.controller.js'

const router = Router()

router.get('/animals', getAnimals);

router.get('/animals/:id', getAnimal);

router.post('/animals', createAnimal);

router.patch('/animals/:id', updateAnimal);

router.delete('/animals/:id', deleteAnimal);

export default router