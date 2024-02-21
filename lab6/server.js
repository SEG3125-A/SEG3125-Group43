const express = require("express");
var 
    http = require('http');
    path = require('path');

const app = express();
const PORT = 3001;

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
// app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

// Serve static files 
// - Set to serve "/public/index.html" on "/"
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/survey.html');
});

// Serve static result files
// - Set tp serve "/public/results.html" on "/results"
app.get('/results', async (req, res) => { 
    // Render results through linked JS file
    res.sendFile(__dirname + '/views/results.html');
});

// Serve static files on PORT
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
