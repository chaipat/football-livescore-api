const express = require('express');
const connection = require('../config/db');

const router = express.Router();

// Endpoint to get fixtures
router.get('/', (req, res) => {
    const query = 'SELECT `ba_program`.*, CONVERT_TZ(`kickoff`, \'+00:00\', \'+07:00\') as `kickoff_th`, `ba_tournament`.`tournament_name`, `ba_tournament`.`tournament_name_en`, `file_group`, `iscup`, (SELECT `ba_team`.`team_name` FROM `ba_team` WHERE `ba_team`.`team_id`=`ba_program`.`hometeam_id`) AS hometeam_title_th, (SELECT `ba_team`.`logo` FROM `ba_team` WHERE `ba_team`.`team_id`=`ba_program`.`hometeam_id`) AS logo_hometeam, (SELECT `ba_team_formation`.`formation` FROM `ba_team_formation` WHERE `ba_team_formation`.`tfid`=`ba_program`.`hometeam_formation`) AS home_formation, (SELECT `ba_team`.`team_name` FROM `ba_team` WHERE `ba_team`.`team_id`=`ba_program`.`awayteam_id`) AS awayteam_title_th, (SELECT `ba_team`.`logo` FROM `ba_team` WHERE `ba_team`.`team_id`=`ba_program`.`awayteam_id`) AS logo_awayteam, (SELECT `ba_team_formation`.`formation` FROM `ba_team_formation` WHERE `ba_team_formation`.`tfid`=`ba_program`.`awayteam_formation`) AS away_formation, (SELECT CAST(`kickoff` AS DATE)) as `sel_date`, `ba_season`.`season_name`, `ba_season`.`season_name2`, `ba_stadium`.`stadium_name`, `ba_stadium`.`stadium_name_th`, `ba_channel`.`channel_name`, `ba_xml_standing`.`group_name`, `ba_xml_standing`.`group_id`, `ba_h2h`.`json` FROM `ba_program` LEFT JOIN `ba_tournament` ON `ba_program`.`league_id` = `ba_tournament`.`tournament_id` LEFT JOIN `ba_season` ON `ba_program`.`season` = `ba_season`.`season_id` LEFT JOIN `ba_h2h` ON `ba_program`.`hometeam_id` = `ba_h2h`.`home_id` and `ba_program`.`awayteam_id` = `ba_h2h`.`away_id` and `ba_program`.`league_id` = `ba_h2h`.`league_id` LEFT JOIN `ba_stadium` ON `ba_program`.`stadium_id` = `ba_stadium`.`stadium_id` LEFT JOIN `ba_channel` ON `ba_program`.`channel1` = `ba_channel`.`channel_id` LEFT JOIN `ba_xml_standing` ON `ba_program`.`hometeam_id` = `ba_xml_standing`.`team_id` WHERE DATE(kickoff) IN (CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 DAY)) ORDER BY `ba_program`.`kickoff` ASC, `ba_program`.`program_id` ASC';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching fixtures:', err);
            res.status(500).send('Server error');
            return;
        }
        res.json(results);
    });
});

module.exports = router;
