const fs = require('fs');
const util = require('util');
const admin = require('firebase-admin');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const express = require('express');
const bodyParser = require('body-parser');
var 
    http = require('http');
    current = new Date();
    path = require('path');

const app = express();
const PORT = 3003;
require('dotenv').config();

app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/survey.html');
});

var serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

app.get('/results', async (req, res) => { 
    // This is exhausting to read, but it's just a bunch of data manipulation
    try {
        // First get database from Firestore
        const snapshot = await db.collection('results').orderBy('timestamp', 'desc').get();
        const results = [];
        snapshot.forEach(doc => {
            // Then store the data in an array
            results.push(doc.data());
        });

        const comments = results.map(result => result.comments).filter(comment => comment != null && comment.trim() != "");
        const users = results.filter(result => result.comments != null && result.comments.trim() != "").map(result => result.firstname + " " + result.lastname);
        // Filter 1 

        // Prepare the data for the charts
        // Map the data from the database based on the format required by the charts
        const chartData = results.map(result => {
            return {
                overallExperience: result.rating,
                recommendation: result.rating2,
                impression: result.impression,
                aspects: Object.entries(result.aspects),
            };
        });

        // Initialize counters for each rating and aspect
        // Since we need the data in terms of counts and not titles
        const overallExperienceCounts = {};
        const recommendationCounts = {};
        const impressionCounts = {};
        const aspectCounts = {};

        // Count the occurrences of each rating and aspect
        // Headache
        chartData.forEach(item => {
            overallExperienceCounts[item.overallExperience] = (overallExperienceCounts[item.overallExperience] || 0) + 1;
            recommendationCounts[item.recommendation] = (recommendationCounts[item.recommendation] || 0) + 1;
            impressionCounts[item.impression] = (impressionCounts[item.impression] || 0) + 1;

            item.aspects.forEach(([aspect, value]) => {
                aspectCounts[aspect] = (aspectCounts[aspect] || 0) + 1;
            });
        });

        let commentsData = comments
        .map((comment, index) => ({
            comment: comment,
            user: users[index]
        }))
        .filter(data => data.comment && data.comment.trim() !== '');
        // Filter 2
    
        commentsData = commentsData.filter(data => data.comment != null && data.comment.trim() != "" && !/^[\r\n\t]*$/.test(data.comment));
        //Filter 3
        
        // Create the final chart data
        const finalChartData = {
            overallExperience: {
                labels: Object.keys(overallExperienceCounts),
                data: Object.values(overallExperienceCounts)
            },
            recommendation: {
                labels: Object.keys(recommendationCounts),
                data: Object.values(recommendationCounts)
            },
            impression: {
                labels: Object.keys(impressionCounts),
                data: Object.values(impressionCounts)
            },
            aspects: {
                labels: Object.keys(aspectCounts),
                data: Object.values(aspectCounts)
            },
            comments: {
                user: commentsData.filter(data => data.comment && data.comment.trim() !== "").map(data => data.user),
                data: commentsData.filter(data => data.comment && data.comment.trim() !== "").map(data => data.comment)
                // Filtered 5 times because Firebase hates me
            }
        };

        const resultsBase = await fs.promises.readFile(__dirname + '/views/results.html', 'utf8');

        // Include the chart data in the HTML as a script
        const html = `
            ${resultsBase.replace(/{{number}}/g, `${results.length} ${results.length > 1 ? 'users' : 'user'}`)}
            <script>
            chartData = ${JSON.stringify(finalChartData)};
            </script>
        `;

        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error. Failed to read from Firestore.');
    }
});

// Saving to JSON file, could use Firebase to write to online database
app.post('/submit', async (req, res) => {
    try { // Reformat the preferences data
        let jsonData = req.body;

        let startIndex = Object.keys(jsonData).indexOf('rating2');
        let endIndex = Object.keys(jsonData).indexOf('comments');
        console.log(startIndex, endIndex);

        let keys = Object.keys(jsonData).slice(startIndex + 1, endIndex);
        let values = keys.map(key => jsonData[key]);

        let newArray = Object.fromEntries(keys.map((_, i) => [keys[i], values[i]]));

        keys.forEach(key => delete jsonData[key]);
        jsonData['aspects'] = newArray;
        jsonData['timestamp'] = Date.now();

        // jsonData.sort((a, b) => {
        //     const dateA = new Date(a.timestamp);
        //     const dateB = new Date(b.timestamp);
        //     return dateB - dateA; // For ascending order
        // });

        const docRef = db.collection('results').doc(jsonData['firstname'] + ' ' + jsonData['lastname']); // Send to firestore

        if (!docRef) {
            console.log("Failed to create a Firestore reference. Incorrect path or data.");
            Toastify({
                text: "Internal server error. Please try again.",
                duration: 3000,
                gravity: "bottom",
                position: 'right',
                backgroundColor: "red",
            }).showToast();
            res.redirect('/');
        }

        if (docRef.get().then((docSnapshot) => { // Doesn't work 
            if (docSnapshot['firstname'] != null) {
                console.log("Document already exists.");
                Toastify({
                    text: "First and last name combo already exists in the database. Please try again.",
                    duration: 3000,
                    gravity: "bottom",
                    position: 'right',
                    backgroundColor: "red",
                }).showToast();
                return;
            }
        }));

        await docRef.set(jsonData);
        console.log("Data has been written to Firestore");
        setTimeout(() => res.redirect('/'), 2000);
    } catch (err) {
        console.error(err);
    }
});

app.listen(PORT, () =>
    console.log(current.getHours() + ":" + current.getMinutes() + " - " + `Server now running on http://localhost:${PORT}`)
);