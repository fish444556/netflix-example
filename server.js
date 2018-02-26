const express = require('express');
const MockData = require('./mock-data');
var cors = require('cors');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: true,
  credentials: true,
}));

app.get('*', (req, res) => {
	res.send(MockData);
});


app.listen(PORT);
console.log('Listening on port: ', PORT);

