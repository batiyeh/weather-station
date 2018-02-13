const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Import all of our controllers
var StationController = require('./controllers/StationController');
var CreateController = require('./controllers/CreateController');
// Route urls to our controllers
app.use('/api/stations', StationController);
app.use('/api/create', CreateController);

app.listen(port, () => console.log(`Listening on port ${port}`));