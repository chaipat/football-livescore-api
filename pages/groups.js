const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to get standings
router.get('/', (req, res) => {
    const query = 'SELECT `group_id`, `group_name` FROM `ba_xml_standing` WHERE `ba_xml_standing`.`tournament_id` = 1001 GROUP BY `group_id` ASC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching standings:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
