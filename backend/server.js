// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('linkedin_db', 'postgres', 'changeme', {
    host: 'localhost',
    dialect: 'postgres'
});
const LinkedInProfile = require('./models/linkedinProfile')(sequelize, DataTypes);
const scrapeLinkedInProfile = require('./scraper');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/api/scrape', async (req, res) => {
    const { url } = req.body;
    try {
        const profileData = await scrapeLinkedInProfile(url);
        const profile = await LinkedInProfile.create(profileData);
        res.status(201).json(profile);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
