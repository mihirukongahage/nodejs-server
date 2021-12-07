const router = require('express').Router()
const pool = require("../connection")


/**
 * Archive notes
 */
router.patch('/archive-note', (req, res) => {
    
    let { note_id } = req.body
    let query = `UPDATE notes SET archive=1 WHERE note_id=?`
    let values = [note_id]

    pool.query(query, values, (err, result) => {
        console.log(result)
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        console.log(`note with the note id ${note_id} archived`)
        res.status(201).send(`note with the note id ${note_id} archived`)
    })
})

/**
 * Unarchive notes
 */
 router.patch('/unarchive-note', (req, res) => {
    
    let { note_id } = req.body
    let query = `UPDATE notes SET archive=0 WHERE note_id=?`
    let values = [note_id]

    pool.query(query, values,
    (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        console.log(`note with the note id ${note_id} unarchived`)
        res.status(201).send(`note with the note id ${note_id} unarchived`)
    })
})

/**
 * Get unarchived notes
 */
 router.get('/list-unarchived-note', (req, res) => {
    
    let query = `SELECT * FROM notes WHERE archive=0`

    pool.query(query, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        console.log(`get unarchived notes`)
        res.status(201).send(result)
    })
})

/**
 * Get archived notes
 */
 router.get('/list-archived-note', (req, res) => {
    
    let query = `SELECT * FROM notes WHERE archive=1`

    pool.query(query, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        }
        console.log(`get archived notes`)
        res.status(201).send(result)
    })
})

module.exports = router
