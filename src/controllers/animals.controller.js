import { pool } from '../db.js';
import * as AnimalsServices from '../services/animals.service.js';

class AnimalsController {
  static getAllAnimals = async (req, res) => {
    const animals = await AnimalsServices.getAllAnimals();  
    res.status(200).json(animals);
  }

  static getAnimalById = async (req, res) => {
    const { id } = req.params;
  
    const animal = await AnimalsServices.getAnimalById(id);
    
    if (animal.length <= 0) return res.status(404).json({
      message: 'Animal not found'
    });
    
    res.status(200).json(animal);
  }

  static createAnimal = async (req, res) => {
    const { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad } = req.body;
    
    if (grupo === undefined || especie === undefined) return res.status(400).json({
      message: 'Bad Request. Please fill this field.'
    });

    const obj_animal = { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad };
    const newAnimal = await AnimalsServices.createAnimal(obj_animal);
    
    res.status(201).send({ 
      id: newAnimal.insertId,
      grupo, 
      especie, 
      raza, 
      anios, 
      peso_aprox,
      cantidad,
      valor_x_unidad
    });
  }

  static updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad } = req.body;

    const obj_animal = { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad };
    const affectedRows = await AnimalsServices.updateAnimal(obj_animal, id);

    if (affectedRows === 0) {
      return res.status(404).json({
        message: 'Animal not found'
      });
    }

    const [record] = await pool.query('SELECT * FROM animales WHERE id = ?', id);
    res.status(200).json(record[0]);
  }

  static deleteAnimal = async (req, res) => {
    const { id } = req.params;
    const affectedRows = await AnimalsServices.deleteAnimal(id);
    if (affectedRows === 0){ 
      return res.status(404).json({
        message: 'Animal not found'
      });
    }
    res.sendStatus(204);
  }
}

export default AnimalsController;