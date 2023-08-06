/* eslint-disable consistent-return */
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
  try {
    const [rows] = await pool.query('SELECT * FROM animales WHERE id = ?', [req.params.id])
    if (rows.length <= 0) return res.status(404).json({
      message: 'Animal not found'
    })
    res.status(200).json(rows[0]) 
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
} 

export const createAnimal = async (req, res) => {
  try {
    const { grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad } = req.body
    const [rows] = await pool.query(
      'INSERT INTO animales (grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [grupo, especie, raza, anios, peso_aprox, descripcion, url_img, cantidad]
    )
    res.status(201).send({ 
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
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const updateAnimal = async (req, res) => {
  try {
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

    res.status(200).json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
}

export const deleteAnimal = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      message: 'Something goes wrong'
    })
  }
} 