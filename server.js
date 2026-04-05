const express = require('express');
const path = require('path');

const app = express();

const basePath = process.cwd();

// servir assets corretamente
app.use('/assets', express.static(path.join(basePath, 'assets')));

// servir arquivos da raiz
app.use(express.static(basePath));

// fallback SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

module.exports = app;
