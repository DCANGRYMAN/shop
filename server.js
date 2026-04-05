const express = require('express');
const path = require('path');
const app = express();

// 1. Serve arquivos da raiz e da pasta assets (estáticos)
app.use(express.static(__dirname));

// 2. Middleware de Fallback (sem strings de rota problemáticas)
// Se nada acima for encontrado, ele envia o index.html
app.use((req, res, next) => {
  // Evita loops infinitos verificando se a requisição não é para um arquivo que não existe
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'index.html'));
  } else {
    next();
  }
});

// A Vercel gerencia o listen, então só rodamos localmente
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
}

module.exports = app;