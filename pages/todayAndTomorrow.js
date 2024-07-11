const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to get matches for today and tomorrow
router.get('/', (req, res) => {
    const query = `
        SELECT * FROM ba_program
        WHERE DATE(kickoff) IN (CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY))
    `;
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching matches:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
