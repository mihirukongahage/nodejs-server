const router = require('express').Router()
const pool = require("../connection")

/**
 * Save a new note
 */
router.post('/add-note', (req, res) => {
    
    let { user_id, note } = req.body
    let query = `INSERT INTO notes (user_id, note) VALUES (?, ?)`
    let values = [user_id, note]

    pool.query(query, values, (err, result) => {
        if(err){
            console.log(err)
            res.status(500).send(err)
        } 
        console.log(`note added to user ${user_id}`)
        res.status(201).send(`note added to user ${user_id}`)
    })
})

/**
 * Update a note
 */
router.patch('/update-note', (req, res) => {
    
    let {note_id, note} = req.body
    let query = `UPDATE notes SET note=? WHERE note_id=?`
    let values = [note, note_id]

    pool.query(query, values, (err, result) => {
        if(err){
                console.log(err)
                res.status(500).send(err)
            } 
            console.log(`note with note id ${note_id} updated`)
            res.status(201).send(`note with note id ${note_id} updated`)
        })
})

/**
 * Delete note
 */
 router.delete('/delete-note', (req, res) => {
    
    let {note_id } = req.body
    let query = `DELETE FROM notes WHERE note_id=?`
    let values = [note_id]

    pool.query(query, values, (err, result) => {
            if(err){
                console.log(err)
                res.status(500).send(err)
            }
            console.log(`note with note id ${note_id} deleted`)
            res.status(201).send(`note with note id ${note_id} deleted`)
        })
})

module.exports = router


