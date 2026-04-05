const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 1. Primeiro, tenta servir arquivos reais (CSS, JS, Imagens) da pasta 'public'
app.use(express.static(path.join(__dirname, '')));

// 2. Fallback: Se o Express não achou um arquivo real acima, 
// ele cai neste middleware que envia o index.html.
// Isso resolve o problema das rotas do lado do cliente (SPA) sem usar regex.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

module.exports = app;