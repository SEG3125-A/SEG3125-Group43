// Serving files on =>
const express = require('express');
const app = express();
const PORT = 3003;

// Serving static files => 
app.use(express.static('public'));

// Home page => 
app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/views/main.html');
});

const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();