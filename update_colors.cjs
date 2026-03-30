const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Remove bg-gradient-to-... entirely and replace text gradients with solid primary
  // For buttons/bgs:
  content = content.replace(/bg-gradient-to-[a-z]+ from-teal-\d+ (via-cyan-\d+ )?to-(cyan|emerald)-\d+ dark:from-teal-\d+ (dark:via-cyan-\d+ )?dark:to-(cyan|emerald)-\d+/g, 'bg-primary hover:bg-primary/90 text-primary-foreground border-transparent border');
  
  // For text gradients:
  content = content.replace(/text-transparent bg-clip-text bg-gradient-to-r from-teal-\d+ (via-cyan-\d+ )?to-(cyan|emerald)-\d+ dark:from-teal-\d+ (dark:via-cyan-\d+ )?dark:to-(cyan|emerald)-\d+/g, 'text-primary');

  // Some gradients might be shorter
  content = content.replace(/bg-gradient-to-[a-z]+ from-[a-z]+-\d+\/\d+ via-[a-z]+-\d+\/\d+ to-[a-z]+-\d+\/\d+/g, 'bg-primary/5');
  content = content.replace(/bg-gradient-to-[a-z]+ from-[a-z]+-\d+\/0 via-[a-z]+-\d+\/0 to-[a-z]+-\d+\/0/g, 'bg-transparent');
  content = content.replace(/group-hover:from-teal-\d+\/\d+ group-hover:via-cyan-\d+\/\d+ group-hover:to-emerald-\d+\/\d+/g, 'group-hover:bg-primary/5');

  // 2. Replace specific color families with primary
  content = content.replace(/text-(teal|cyan|emerald)-\d+/g, 'text-primary');
  content = content.replace(/bg-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'bg-primary/$2');
  content = content.replace(/bg-(teal|cyan|emerald)-\d+\/(\d+)/g, 'bg-primary/$2');
  content = content.replace(/bg-(teal|cyan|emerald)-\d+/g, 'bg-primary');
  
  // handle hover states
  content = content.replace(/hover:text-(teal|cyan|emerald)-\d+/g, 'hover:text-primary');
  content = content.replace(/hover:bg-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'hover:bg-primary/$2');
  content = content.replace(/hover:bg-(teal|cyan|emerald)-\d+\/(\d+)/g, 'hover:bg-primary/$2');
  content = content.replace(/hover:bg-(teal|cyan|emerald)-\d+/g, 'hover:bg-primary');

  content = content.replace(/dark:hover:bg-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'dark:hover:bg-primary/$2');
  content = content.replace(/dark:hover:bg-(teal|cyan|emerald)-\d+\/(\d+)/g, 'dark:hover:bg-primary/$2');

  content = content.replace(/dark:bg-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'dark:bg-primary/$2');
  content = content.replace(/dark:bg-(teal|cyan|emerald)-\d+\/(\d+)/g, 'dark:bg-primary/$2');
  
  content = content.replace(/border-(teal|cyan|emerald)-\d+\/(\d+)/g, 'border-primary/$2');
  content = content.replace(/dark:border-(teal|cyan|emerald)-\d+\/(\d+)/g, 'dark:border-primary/$2');
  content = content.replace(/hover:border-(teal|cyan|emerald)-\d+\/(\d+)/g, 'hover:border-primary/$2');
  content = content.replace(/dark:hover:border-(teal|cyan|emerald)-\d+\/(\d+)/g, 'dark:hover:border-primary/$2');
  
  content = content.replace(/shadow-(teal|cyan|emerald)-\d+\/(\d+)/g, 'shadow-primary/$2');
  content = content.replace(/shadow-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'shadow-primary/$2');
  content = content.replace(/hover:shadow-(teal|cyan|emerald)-\d+\/(\d+)/g, 'hover:shadow-primary/$2');
  content = content.replace(/hover:shadow-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'hover:shadow-primary/$2');
  
  content = content.replace(/dark:shadow-(teal|cyan|emerald)-\d+\/(\d+)/g, 'dark:shadow-primary/$2');
  content = content.replace(/dark:shadow-(teal|cyan|emerald)-\d+\/\[(0\.\d+)\]/g, 'dark:shadow-primary/$2');

  // Replace special radial gradients in Hero
  content = content.replace(/radial-gradient\(circle, hsl\(168 76% 50%\) 0%, transparent 70%\)/g, 'hsl(var(--primary))');
  content = content.replace(/radial-gradient\(circle, hsl\(190 90% 50%\) 0%, transparent 70%\)/g, 'hsl(var(--primary))');
  content = content.replace(/radial-gradient\(circle, hsl\(155 72% 45%\) 0%, transparent 70%\)/g, 'hsl(var(--primary))');
  content = content.replace(/radial-gradient\(circle, hsl\(210 80% 55%\) 0%, transparent 70%\)/g, 'hsl(var(--primary))');
  content = content.replace(/radial-gradient\(circle, hsl\(168 76% 50%\) 0%, transparent 60%\)/g, 'hsl(var(--primary))');

  // In Hero bg base layer
  content = content.replace(/bg-gradient-to-br from-background via-background to-background/g, 'bg-background');

  // Grouped bg hover border
  content = content.replace(/group-hover:border-teal-[^\s"]+/g, 'group-hover:border-primary/20');

  // Special case for bg-teal-50 -> bg-primary/10 (light mode) and similar
  content = content.replace(/bg-(teal|cyan|emerald)-50 /g, 'bg-primary/10 ');
  content = content.replace(/bg-(teal|cyan|emerald)-50\//g, 'bg-primary/');
  content = content.replace(/hover:bg-(teal|cyan|emerald)-50 /g, 'hover:bg-primary/10 ');
  content = content.replace(/hover:bg-(teal|cyan|emerald)-50\//g, 'hover:bg-primary/');
  content = content.replace(/dark:hover:text-(teal|cyan|emerald)-[^\s"]+/g, 'dark:hover:text-primary');
  content = content.replace(/dark:text-(teal|cyan|emerald)-[^\s"]+/g, 'dark:text-primary');

  fs.writeFileSync(filePath, content, 'utf8');
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

processDirectory(componentsDir);

console.log('Colors and Gradients replacement completed.');
