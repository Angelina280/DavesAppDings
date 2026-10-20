const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
let html = fs.readFileSync(path.join(root, 'login.html'), 'utf8');
let css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
const image = name => 'data:image/png;base64,' + fs.readFileSync(path.join(root, name)).toString('base64');
css = css.replace('./Oregano.png', image('Oregano.png'));
html = html.replace('<link rel="stylesheet" href="./style.css">', () => `<style>${css}</style>`)
 .replace('<script src="./script.js" defer></script>', () => `<script>${js}</script>`)
 .replace('./Dome.png', image('Dome.png'));
fs.writeFileSync(path.join(root, 'DavesAppDings.html'), html);
console.log('Eigenständige HTML erzeugt');
