const express = require('express');
const pool = require('../database');

const router = express.Router();

//Así se mandan llamar todos los proyectos
router.get('/', async (req, res) => {
    const book = await pool.query('select * from book limit 6');
    res.render('index', {book});
});


module.exports = router;