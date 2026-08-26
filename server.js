// Servidor estático minimalista para Railway — reemplaza a GitHub Pages,
// que no era alcanzable desde datos móviles en la red de Marco (confirmado
// 26/08/2026: Supabase e internet en general sí cargaban, github.io no).
// Sin dependencias a propósito: un solo archivo (index.html), no vale la
// pena un framework.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = fs.readFileSync(path.join(__dirname, 'index.html'));

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(INDEX);
  })
  .listen(PORT, () => console.log(`Panel escuchando en puerto ${PORT}`));
