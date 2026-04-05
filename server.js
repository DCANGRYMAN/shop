const express = require('express');
const path = require('path');

const app = express();

// 🔥 caminho correto no serverless
const basePath = __dirname;

// logs (opcional)
app.use((req, res, next) => {
  console.log('REQ:', req.url);
  next();
});

// 🔥 assets primeiro
app.use('/assets', express.static(path.join(basePath, 'assets')));

// 🔥 arquivos estáticos
app.use(express.static(basePath));

// 🔥 fallback SPA
app.get('*', (req, res) => {
  const filePath = path.join(basePath, 'index.html');

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('ERRO REAL:', err);
      res.status(500).send('Erro interno');
    }
  });
});

module.exports = app;
