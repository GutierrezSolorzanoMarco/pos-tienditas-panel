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
const RUTA_APK = path.join(__dirname, 'descargas', 'pos-tienditas.apk');

http
  .createServer((req, res) => {
    // Descarga de la última APK compilada — ver botón "Descargar app" en
    // index.html. Para publicar una versión nueva: copiar el .apk a
    // descargas/pos-tienditas.apk (sobrescribiendo) y `railway up --detach`.
    // A propósito NO se comitea a git (pesa ~120MB) — pero tampoco lleva
    // .gitignore, porque `railway up` respeta el .gitignore al indexar y
    // se lo saltaría también a él. Se queda como archivo sin trackear:
    // `git status` lo va a mostrar siempre como "untracked", ignorarlo ahí
    // (nunca `git add -A` en este repo, agregar archivos por nombre).
    if (req.url === '/pos-tienditas.apk') {
      if (!fs.existsSync(RUTA_APK)) {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        return res.end('Todavía no se ha subido ninguna APK.');
      }
      res.writeHead(200, {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Disposition': 'attachment; filename="pos-tienditas.apk"',
        'Content-Length': fs.statSync(RUTA_APK).size,
      });
      return fs.createReadStream(RUTA_APK).pipe(res);
    }

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(INDEX);
  })
  .listen(PORT, () => console.log(`Panel escuchando en puerto ${PORT}`));
