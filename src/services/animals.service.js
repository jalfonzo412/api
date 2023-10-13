import { pool } from '../db.js';

export const getAllAnimals = async () => {
  const [rows] = await pool.query('SELECT * FROM animales')
  return rows
}

export const getAnimalById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM animales WHERE id = ?', id)
  return rows
}

export const createAnimal = async (obj) => {
  const [rows] = await pool.query('INSERT INTO animales SET ?', obj)
  return rows
}

export const updateAnimal = async (obj, id) => {
  const [{ affectedRows }] = await pool.query(
    'UPDATE animales SET grupo = IFNULL(?, grupo), especie = IFNULL(?, especie), raza = IFNULL(?, raza), anios = IFNULL(?, anios), peso_aprox = IFNULL(?, peso_aprox), cantidad = IFNULL(?, cantidad), valor_x_unidad = IFNULL(?, valor_x_unidad) WHERE id = ?', 
    [obj.grupo, obj.especie, obj.raza, obj.anios, obj.peso_aprox, obj.cantidad, obj.valor_x_unidad, id]
  )
  return affectedRows
}

export const deleteAnimal = async (id) => {
  const [{ affectedRows }] = await pool.query('DELETE FROM animales WHERE id = ?', id)
  return affectedRows
}