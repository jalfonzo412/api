import { pool } from '../db.js';

export const getAnimals = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM animales')
  res.json(rows)
}

export const createAnimals = async (req, res) => {
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

export const updateAnimals = (req, res) => res.send('actualizando registro del animal')

export const deleteAnimals = (req, res) => res.send('eliminando registro del animal')