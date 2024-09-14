const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve static files from the dist/browser directory
app.use(express.static(path.join(__dirname, '../dist/browser')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, '../dist/browser/index.html');
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('File not found:', filePath);
            res.status(404).send('File not found');
            return;
        }
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(err.status).end();
            }
        });
    });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

