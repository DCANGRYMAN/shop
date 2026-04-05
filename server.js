const express = require('express');
const path = require('path');
const app = express();

// 1. Defina o caminho da raiz explicitamente
const root = path.join(__dirname);

// 2. Serve arquivos estáticos da raiz (onde está o index.html e a pasta assets)
// O parâmetro 'fallthrough: true' permite que ele passe para o próximo middleware se não achar o arquivo
app.use(express.static(root, { fallthrough: true }));

// 3. Fallback inteligente: Só entrega o index.html se não for um pedido de arquivo (com extensão)
app.use((req, res, next) => {
  // Se a URL contém um ponto (ex: .js, .css, .png) e chegou aqui, é porque o arquivo NÃO existe
  if (req.url.includes('.') && !req.url.endsWith('.html')) {
    return res.status(404).send('Arquivo não encontrado');
  }
  // Caso contrário, assume que é uma rota de navegação e envia o HTML
  res.sendFile(path.join(root, 'index.html'));
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));
}

module.exports = app;