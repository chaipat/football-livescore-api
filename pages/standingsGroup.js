const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to get live scores for a specific date
router.get('/:id', (req, res) => {
    const { id } = req.params;
    let query = 'SELECT * FROM `ba_xml_standing` LEFT JOIN `ba_team` ON `ba_xml_standing`.`team_id` = `ba_team`.`team_id` ';
        query =  query + '  WHERE `ba_xml_standing`.`tournament_id` = 1001 AND `ba_xml_standing`.`group_id` = ? ';
        query =  query + ' ORDER BY `group_id` ASC, `team_position` ASC';
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error fetching live scores:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
