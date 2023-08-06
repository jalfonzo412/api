import { pool } from '../db.js';

export const getAnimals = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM animales')
  res.json(rows)
}

export const getAnimal = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM animales WHERE id = ?', [req.params.id])

  if (rows.length <= 0) return res.status(404).json({
    message: 'Animal not found'
  })

  res.json(rows[0])
} 

export const createAnimal = async (req, res) => {
  const {grupo, especie, raza, anios, peso_aprox, descripcion, url_img} = req.body
  const [rows] = await pool.query('INSERT INTO animales (grupo, especie, raza, anios, peso_aprox, descripcion, url_img) VALUES (?, ?, ?, ?, ?, ?, ?)', 
  [grupo, especie, raza, anios, peso_aprox, descripcion, url_img])
  res.send({ 
    id: rows.insertId,
    grupo, 
    especie, 
    raza, 
    anios, 
    peso_aprox, 
    descripcion,
    url_img
  })
}

export const updateAnimal = (req, res) => res.send('actualizando registro del animal')

export const deleteAnimal = (req, res) => res.send('eliminando registro del animal')