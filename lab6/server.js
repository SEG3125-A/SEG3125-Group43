const fs = require('fs');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const express = require('express');
const bodyParser = require('body-parser');
var 
    http = require('http');
    current = new Date();
    path = require('path');

const app = express();
const PORT = 3001;

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/survey.html');
});

app.get('/results', async (req, res) => { 
    const filePath = path.join(__dirname, 'result', 'results.json');
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        // Rather than sending the JSON data, we are sending the HTML file
        const resultsBase = await fs.promises.readFile(__dirname + '/views/results.html', 'utf8');

        // Fill in the table with the data from the JSON file
        const resultsCompiled = resultsBase
        .replace('{{firstname}}', JSON.parse(data).firstname)
        .replace('{{lastname}}', JSON.parse(data).lastname)
        .replace('{{rating}}', JSON.parse(data).rating)
        .replace('{{rating2}}', JSON.parse(data).rating2)
        .replace('{{aspects}}', util.format('%j', JSON.parse(data).aspects)) // TODO: Format the JSON data
        .replace('{{comments}}', JSON.parse(data).comments)
        .replace('{{impression}}', JSON.parse(data).impression)
        // res.json(JSON.parse(data));
        res.send(resultsCompiled);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error. Failed to read file.');
    }
    // TODO: Check if the file exists
    // await fs.promises.access(filePath, fs.constants.F_OK, async (err) => {
    //     if(err){
    //         console.error(err);
    //         res.status(404).send('File not found');
    //     } else {
            
    //     }
    // });
});

// Saving to JSON file, could use Firebase to write to online database
app.post('/submit', async (req, res) => {
    console.log(req.body);
    const filePath = path.join(__dirname, 'result', 'results.json');
    try {
        await fs.promises.writeFile(filePath, JSON.stringify(req.body, null, 2), (err) => {
            if (err) {
                console.error(err);
            } else{
                console.log("Data has been written to results.json")
            }
        });

        let data = await fs.promises.readFile(filePath, 'utf8');
            
        const jsonData = JSON.parse(data);

        let startIndex = Object.keys(jsonData).indexOf('rating2');
        let endIndex = Object.keys(jsonData).indexOf('comments');
        console.log(startIndex, endIndex);

        let keys = Object.keys(jsonData).slice(startIndex + 1, endIndex);
        let values = keys.map(key => jsonData[key]);

        let newArray = Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));
        console.log(newArray);
        
        keys.forEach(key => delete jsonData[key]);
        jsonData['aspects'] = newArray;
        console.log(jsonData);

        await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('Data has been written to results.json');
            }
        });


        // let data = await fs.promises.readFile(filePath, 'utf8');
        // const jsonData = JSON.parse(data);
        // jsonData['firstname'] = 'nothing';
        // console.log(jsonData);

        // await fs.promises.writeFile(filePath, JSON.stringify(jsonData, null, 2));
        // console.log('Data has been written to results.json');
    } catch (err) {
        console.error(err);
    }
    res.redirect('/');
});

app.listen(PORT, () =>
    console.log(current.getHours() + ":" + current.getMinutes() + " - " + `Server is running on http://localhost:${PORT}`)
);