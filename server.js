const express = require('express');
const path = require('path');
const app = express();

// 1. Serve arquivos da raiz e da pasta assets
app.use(express.static(__dirname));

// 2. Fallback para o index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// A Vercel não quer o app.listen ativo no ambiente de produção deles
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor local rodando em http://localhost:${PORT}`);
  });
}

module.exports = app;