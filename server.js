const express = require('express');
const path = require('path');

const app = express();

// 🔥 caminho seguro no Vercel
const basePath = process.cwd();

// Log pra debug
app.use((req, res, next) => {
  console.log('REQ:', req.url);
  next();
});

// Static
app.use(express.static(basePath));

// SPA fallback (CRÍTICO)
app.get('*', (req, res) => {
  const filePath = path.join(basePath, 'index.html');

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Erro ao enviar index.html:', err);
      res.status(500).send('Erro interno');
    }
  });
});

module.exports = app;