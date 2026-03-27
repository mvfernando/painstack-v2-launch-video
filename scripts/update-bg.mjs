import fs from 'fs';
import path from 'path';

const dir = path.join(process.cwd(), 'src/compositions/Video4Product/scenes');
const files = fs.readdirSync(dir);

for (const file of files) {
  if (file.endsWith('.tsx') && file !== 'Scene18_FadeOut.tsx' && file !== 'Scene17_BrandClose.tsx') {
    const p = path.join(dir, file);
    let c = fs.readFileSync(p, 'utf8');
    c = c.replace(/backgroundColor:\s*['"]#(060609|08080F|0A0A0F|FFFFFF)['"]/g, "backgroundColor: '#0F172A'");
    fs.writeFileSync(p, c);
  }
}

const mainVideoPath = path.join(process.cwd(), 'src/compositions/Video4Product/PainstackVideo.tsx');
if (fs.existsSync(mainVideoPath)) {
  let c = fs.readFileSync(mainVideoPath, 'utf8');
  c = c.replace(/backgroundColor:\s*['"]#060609['"]/g, "backgroundColor: '#0F172A'");
  fs.writeFileSync(mainVideoPath, c);
}
console.log('Background updated in all scenes.');
