const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../lib/auth');

const pool = require('../database');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('books/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title, author, editorial, genre, pages, cover } = req.body;
    const newBook = { 
        title,
        author,
        editorial,
        genre,
        pages,
        cover,
        user_id: req.user.id
    };
    await pool.query('insert into book set ?', [newBook]);
    req.flash('success', 'Book saved successfully');
    res.redirect('/book');
});

router.get('/', isLoggedIn, async (req, res) => {
    const book = await pool.query('select * from book where user_id = ?', [req.user.id]);
    res.render('books/list', {book});
});

//This method is for check the progress of every book
router.get('/yourprogress/:id', isLoggedIn, async (req, res) => {
    //Mando llamar el id del libro
    const { id } = req.params;
    //Hago la consulta y le paso el id del libro para que distinga
    const progress = await pool.query('select * from addprogress where book_id = ?', [id]);
    //Mando llamar a todos los libros que coincidan con el id del libro que cliqueamos
    const book = await pool.query('select * from book where id = ?', [id]);
    //El book:book[0] pasa la información libro por libro
    res.render('books/progress', {progress, book:book[0]});
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
   const { id } = req.params;
   await pool.query('delete from book where id = ?', [id]);
   req.flash('success','Book deleted successfully');
   res.redirect('/book');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const book = await pool.query('select * from book where id = ?', [id]);
    res.render('books/edit', { book: book [0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { title, author, editorial, genre, pages, cover } = req.body;
    const newBook = { 
        title,
        author,
        editorial,
        genre,
        pages,
        cover
    };
    await pool.query('update book set ? where id = ?', [newBook, id]);
    req.flash('success', 'Book updated successfully');
    res.redirect('/book');
})

//This is used to add the progress of every book.
router.post('/markprogress/:id', isLoggedIn, async (req, res) => {
    const { progress, review, score, status } = req.body;
    //Pido el id del libro
    const { id } = req.params;
    const newBook = { 
        progress,
        review,
        score,
        status,
        //Inserto el id del libro sin necesidad de tener inputs
        book_id: id,
        user_id: req.user.id
    };
    await pool.query('insert into addprogress set ?', [newBook]);
    req.flash('success', 'Progress saved successfully');
    res.redirect('/book');
});

module.exports = router;