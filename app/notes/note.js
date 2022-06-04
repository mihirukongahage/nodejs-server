const router = require("express").Router();
const pool = require("../connection");
const logger = require("../logger/logger");

/**
 * Get all notes
 */
router.get("/notes", (req, res) => {
  let query = `SELECT * FROM notes`;

  pool.query(query, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400).send(err);
    }
    var notesArray = JSON.parse(JSON.stringify(result));
    logger.info(`return all notes`);
    res.status(200).send(notesArray);
  });
});

/**
 * Get notes by user_id
 */
router.get("/notes/:user_id", (req, res) => {
  const { user_id } = req.params;
  let query = `SELECT * FROM notes WHERE user_id=?`;
  let values = [user_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400).send(err);
    }
    var note = JSON.parse(JSON.stringify(result));
    logger.info(`return notes with the user id ${user_id}`);
    res.status(200).send(note);
  });
});

/**
 * Get note by note_id
 */
router.get("/note/:note_id", (req, res) => {
  const { note_id } = req.params;
  let query = `SELECT * FROM notes WHERE note_id=?`;
  let values = [note_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400).send(err);
    }
    var note = JSON.parse(JSON.stringify(result));
    logger.info(`return note with the id ${note_id}`);
    res.status(200).send(note);
  });
});

/**
 * Add a new note
 */
router.post("/notes", (req, res) => {
  let { user_id, note } = req.body;
  let query = `INSERT INTO notes (user_id, note) VALUES (?, ?)`;
  let values = [user_id, note];

  pool.query(query, values, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400).send(err);
    }
    logger.info(`note added to user ${user_id}`);
    res.status(201).send(`note added to user ${user_id}`);
  });
});

/**
 * Update a note
 */
router.put("/notes", (req, res) => {
  let { note_id, note } = req.body;
  let query = `UPDATE notes SET note=? WHERE note_id=?`;
  let values = [note, note_id];

  pool.query(query, values, (err, result) => {
    if (err) {
      logger.error(err);
      res.status(400).send(err);
    }
    logger.info(`note with note id ${note_id} updated`);
    res.status(201).send(`note with note id ${note_id} updated`);
  });
});

/**
 * Delete a note
 */
let deleteNote;
router.delete("/notes/:note_id", (req, res) => {
  let { note_id } = req.params;

  if (note_id.charAt(0) !== "D") {
    let query = `DELETE FROM notes WHERE note_id=?`;
    let values = [note_id];

    deleteNote = setTimeout(() => {
      pool.query(query, values, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        console.log(`note with note id ${note_id} deleted`);
        res.status(201).send(`note with note id ${note_id} deleted`);
      });
    }, 5000);
  } else {
    clearTimeout(deleteNote);
    console.log(`note ${note_id.slice(1)} deletion aborted`);
    res.status(201).send(`note ${note_id.slice(1)} deletion aborted`);
  }
});

module.exports = router;
