const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3000/api/db');
        const data = response.data;
        let html = '';
        for (let prop in data.props) {
            html += `<div>${prop}: ${data.props[prop]}</div>`;
        }
        res.send(html);
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}`));
