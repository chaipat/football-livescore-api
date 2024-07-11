const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to get standings
router.get('/', (req, res) => {
    const query = 'SELECT * FROM `ba_xml_standing` LEFT JOIN `ba_team` ON `ba_xml_standing`.`team_id` = `ba_team`.`team_id` WHERE `ba_xml_standing`.`tournament_id` = 1001 ORDER BY `group_id` ASC, `team_position` ASC';
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
