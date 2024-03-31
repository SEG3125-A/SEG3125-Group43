const express = require('express');

const app = express();
const PORT = 3003;

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/public/views/main.html');
});

app.listen(PORT, () =>
    console.log(`Server now running on http://localhost:${PORT}`)
);