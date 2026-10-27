// Liest die Onepage-Steuerelemente (package.json je Sektion) und erzeugt src/defaults.json
// mit den Standardwerten (Texte, Farben, Listen) jeder Sektion.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'src/sections');
const out = {};

for (const name of fs.readdirSync(dir)) {
  const file = path.join(dir, name, 'package.json');
  if (!fs.existsSync(file)) continue;
  const control = JSON.parse(fs.readFileSync(file, 'utf8'))?.onepage?.control ?? {};
  const props = {};
  for (const [key, def] of Object.entries(control)) {
    if (def && Object.prototype.hasOwnProperty.call(def, 'default')) props[key] = def.default;
  }
  out[name] = props;
}

fs.writeFileSync(path.join(root, 'src/defaults.json'), JSON.stringify(out, null, 2));
console.log('defaults.json:', Object.keys(out).length, 'Sektionen');
