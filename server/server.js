const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
    });


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
    });
