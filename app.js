const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const connection = require('./config/db');

const home = require('./pages/index');
const fixtures = require('./pages/fixtures');
const matchday = require('./pages/matchday');
const standings = require('./pages/standings');
const listGroups = require('./pages/groups');
const standingsGroup = require('./pages/standingsGroup');

const addMatch = require('./pages/addMatch');
const updateScore = require('./pages/updateScore');
const todayAndTomorrow = require('./pages/todayAndTomorrow');

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/', home);

// Use route
app.use('/fixtures', fixtures);
app.use('/matchday', matchday);

// Use standings route
app.use('/standings', standings);
app.use('/listgroups', listGroups);
app.use('/group', standingsGroup);


// Use the addMatch route
app.use('/matches', addMatch);
app.use('/matches', updateScore);
// Use the todayAndTomorrow route
app.use('/matches/today-and-tomorrow', todayAndTomorrow);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
