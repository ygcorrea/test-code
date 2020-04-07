const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const { decifraCifrado, xpto } = require('../index');
const form = require('form-data');
const axios = require('axios');

const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
  fetch('suaApi')
    .then((response) => response.json())
    .then((answer) => {
      answer.decifrado = decifraCifrado(answer.cifrado, answer.numero_casas);
      answer.resumo_criptografico = xpto(answer.decifrado);
      fs.writeFileSync('answer.json', JSON.stringify(answer));
      res.send(answer);
    });
});

app.get('/submit', function (req, res) {
  res.sendFile('form.html');
});

app.post('/', function (req, res) {
  const formData = new form();
  const file = req.files[0];
  formData.append('answer', file);
  axios({
    method: 'post',
    url: 'suaApi',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => console.log(res));
});

app.listen(3333);
