const express = require('express');
const path = require('path');

const app = express();

// raiz do projeto
const basePath = __dirname;

// servir assets corretamente
app.use('/assets', express.static(path.join(basePath, 'assets')));

// servir arquivos estáticos da raiz (opcional)
app.use(express.static(basePath));

// rota principal única
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

module.exports = app;