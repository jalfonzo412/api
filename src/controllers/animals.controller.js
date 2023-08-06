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
  const { grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad } = req.body
  const [rows] = await pool.query(
    'INSERT INTO animales (grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
    [grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad]
  )
  res.send({ 
    id: rows.insertId,
    grupo, 
    especie, 
    raza, 
    anios, 
    peso_aprox, 
    descripcion,
    url_img, 
    cantidad
  })
}

export const updateAnimal = async (req, res) => {
  const { id } = req.params
  const { grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad } = req.body
  const [result] = await pool.query(
    'UPDATE animales SET grupo = IFNULL(?, grupo), especie = IFNULL(?, especie), raza = IFNULL(?, raza), anios = IFNULL(?, anios), peso_aprox = IFNULL(?, peso_aprox), descripcion = IFNULL(?, descripcion), url_img = IFNULL(?, url_img), cantidad = IFNULL(?, cantidad) WHERE id = ?', 
    [grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad, id]
  )

  if (result.affectedRows === 0) {
    return res.status(404).json({
      message: 'Animal not found'
    })
  }

  const [rows] = await pool.query(
    'SELECT * FROM animales WHERE id = ?', 
    [req.params.id]
  )

  res.json(rows[0])
}

export const deleteAnimal = async (req, res) => {
  const result = await pool.query(
    'DELETE * FROM animales WHERE id = ? AND cantidad <= 0', 
    [req.params.id]
  )
  
  if (result.affectedRows <= 0){ 
    return res.status(404).json({
      message: 'Animal not found'
    })
  }
  
  res.sendStatus(204)
} 