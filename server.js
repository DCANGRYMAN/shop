const express = require('express');
const path = require('path');

const app = express();

// 🔥 caminho correto relativo ao arquivo
const basePath = path.resolve(__dirname);

// Static (ajuste se tiver /dist ou /build)
app.use(express.static(basePath));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(basePath, 'index.html'));
});

module.exports = app;