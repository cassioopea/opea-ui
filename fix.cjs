const fs = require('fs');
const path = require('path');
const uiDir = path.join(process.cwd(), 'src/ui');

const files = fs.readdirSync(uiDir);
const anomalies = {};

for (const file of files) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(uiDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix imports
    content = content.replace(/@\/components\/ui\//g, '@/ui/');
    fs.writeFileSync(filePath, content, 'utf8');

    // Search for anomalies
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      // Find hardcoded colors or arbitrary text sizes, ignore valid token classes
      if (/#([0-9a-fA-F]{3,8})\b/.test(line) || /rgb\(/.test(line) || /rgba\(/.test(line) || /oklch\(/.test(line) || /text-\[\d+px\]/.test(line)) {
        if (!anomalies[file]) anomalies[file] = [];
        anomalies[file].push(`L${index + 1}: ${line.trim()}`);
      }
    });
  }
}
console.log(JSON.stringify(anomalies, null, 2));
