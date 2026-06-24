const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'src/patterns');

const files = fs.readdirSync(dir);
const coupling = {};

for (const file of files) {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix imports
    content = content.replace(/@\/components\/ui\//g, '@/ui/');
    content = content.replace(/@\/components\/patterns\//g, './');
    fs.writeFileSync(filePath, content, 'utf8');

    // Search for coupling
    const lines = content.split('\n');
    lines.forEach((line, index) => {
      // Look for imports that are not from @/ui, @/lib, react, lucide-react, etc.
      const match = line.match(/import\s+.*\s+from\s+['"]([^'"]+)['"]/);
      if (match) {
        const importPath = match[1];
        if (
          importPath.startsWith('@/') &&
          !importPath.startsWith('@/ui') &&
          !importPath.startsWith('@/lib') &&
          !importPath.startsWith('@/patterns')
        ) {
          if (!coupling[file]) coupling[file] = [];
          coupling[file].push(`L${index + 1}: ${line.trim()}`);
        }
      }
    });
  }
}
console.log(JSON.stringify(coupling, null, 2));
