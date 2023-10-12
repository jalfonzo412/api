import { pool } from '../db.js';

export const getAnimals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM animales')  
    res.status(200).json(rows)
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const getAnimal = async (req, res) => {
    const { id } = req.params
  
    const [rows] = await pool.query('SELECT * FROM animales WHERE id = ?', id)
    
    if (rows.length <= 0) return res.status(404).json({
      message: 'Animal not found'
    })
    
    res.status(200).json(rows[0])
} 

export const createAnimal = async (req, res) => {
  try {
    const { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad } = req.body
    
    if (grupo === undefined || especie === undefined) return res.status(400).json({
      message: 'Bad Request. Please fill this field.'
    })

    const animal = { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad }
    const [rows] = await pool.query('INSERT INTO animales SET ?', animal)
    res.status(201).send({ 
      id: rows.insertId,
      grupo, 
      especie, 
      raza, 
      anios, 
      peso_aprox,
      cantidad,
      valor_x_unidad
    })
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const updateAnimal = async (req, res) => {
  try {
    const { id } = req.params
    const { grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad } = req.body

    const [result] = await pool.query(
      'UPDATE animales SET grupo = IFNULL(?, grupo), especie = IFNULL(?, especie), raza = IFNULL(?, raza), anios = IFNULL(?, anios), peso_aprox = IFNULL(?, peso_aprox), cantidad = IFNULL(?, cantidad), valor_x_unidad = IFNULL(?, valor_x_unidad) WHERE id = ?', 
      [grupo, especie, raza, anios, peso_aprox, cantidad, valor_x_unidad, id]
    )

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: 'Animal not found'
      })
    }

    const [rows] = await pool.query('SELECT * FROM animales WHERE id = ?', id)
    res.status(200).json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const deleteAnimal = async (req, res) => {
  const { id } = req.params
  const result = await pool.query(
    'DELETE FROM animales WHERE id = ? OR cantidad <= 0', 
    id
  )
  if (result.affectedRows <= 0){ 
    return res.status(404).json({
      message: 'Animal not found'
    })
  }
  res.sendStatus(204)
} 