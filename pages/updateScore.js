const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to update scores
router.post('/:id/score', (req, res) => {
    const { id } = req.params;
    const { home_score, away_score } = req.body;
    const query = 'UPDATE matches SET home_score = ?, away_score = ? WHERE id = ?';
    connection.query(query, [home_score, away_score, id], (err, results) => {
        if (err) {
            console.error('Error updating score:', err);
            res.status(500).send('Server error');
            return;
        }
        res.send('Score updated');
    });
});

module.exports = router;
