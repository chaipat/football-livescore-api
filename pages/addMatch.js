const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to add a new match
router.post('/', (req, res) => {
    const { home_team, away_team, match_time } = req.body;
    const query = 'INSERT INTO matches (home_team, away_team, match_time) VALUES (?, ?, ?)';
    connection.query(query, [home_team, away_team, match_time], (err, results) => {
        if (err) {
            console.error('Error adding match:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json({ id: results.insertId });
    });
});

module.exports = router;
