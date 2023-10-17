import { Router } from 'express';
import AnimalsController from '../controllers/animals.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    animals:
 *      type: "object"
 *      properties:
 *        grupo: 
 *          type: "string" 
 *        especie:
 *          type: "string"
 *        raza:
 *          type: "string"
 *        anios:
 *          type: "integer"
 *        peso_aprox:
 *          type: "number"
 *        cantidad: 
 *          type: "integer"
 *        valor_x_unidad:
 *          type: "number"
 *      required:
 *        - grupo
 *        - especie
 *      example:
 *        grupo: "Mamifero"
 *        especie: "Perro"
 *        raza: "Chihuahua"
 *        anios: 3 
 *        peso_aprox: "2.1"
 *        cantidad: "5"
 *        valor_x_unidad: "5"
 */

/**
 * @swagger
 * /api/animals:
 *   get:
 *     summary: return all animals
 *     tags: [Animals]
 *     responses:
 *       200:
 *          description: all animals
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/animals'
 */
router.get('/animals', AnimalsController.getAllAnimals);

/**
 * @swagger
 * /api/animals/{id}:
 *   get:
 *     summary: return a animal
 *     tags: [Animals]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "animal id"
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *          description: successfully returned
 *          content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 $ref: '#/components/schemas/animals'
 *       400:
 *         description: animal id invalid
 *       404:
 *         description: animal not found
 */
router.get('/animals/:id', AnimalsController.getAnimalById);

/**
 * @swagger
 * /api/animals:
 *   post:
 *     summary: create a new animal
 *     tags: [Animals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/animals'
 *     responses:
 *       201:
 *          description: new animal created!
 *          content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/animals'
 *       500:
 *          description: Server error
 */
router.post('/animals', AnimalsController.createAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   put:
 *     summary: update a single animal
 *     tags: [Animals]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "animal id"
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/animals'
 *     responses:
 *       200:
 *          description: animal updated!
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: '#/components/schemas/animals'
 *       400:
 *         description: animal id invalid
 *       404:
 *         description: animal not found
 */
router.patch('/animals/:id', AnimalsController.updateAnimal);

/**
 * @swagger
 * /api/animals/{id}:
 *   delete:
 *     summary: eliminate animal
 *     tags: [Animals]
 *     parameters:
 *       - in: "path"
 *         name: "id"
 *         description: "animal id"
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       204:
 *          description: animal deleted!
 *       400:
 *         description: animal id invalid
 *       404:
 *         description: animal not found
 */
router.delete('/animals/:id', AnimalsController.deleteAnimal);

export default router;