import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const NODE_MODULES_DIR = path.join(process.cwd(), 'node_modules');

const getFolderSize = (folderPath: string): number => {
  try {
    const sizeOutput = execSync(`du -sk "${folderPath}"`).toString();
    const sizeInKb = parseInt(sizeOutput.split('\t')[0], 10);
    return sizeInKb * 1024; // Convert KB to bytes
  } catch (error) {
    return 0;
  }
};

const findHeaviestPackage = () => {
  if (!fs.existsSync(NODE_MODULES_DIR)) {
    console.log('node_modules directory not found.');
    return;
  }

  const packages = fs.readdirSync(NODE_MODULES_DIR).filter(pkg => !pkg.startsWith('.'));

  const packageSizes = packages.map(pkg => {
    const pkgPath = path.join(NODE_MODULES_DIR, pkg);
    return { name: pkg, size: getFolderSize(pkgPath) };
  });

  packageSizes.sort((a, b) => b.size - a.size);

  console.log('📦 Top 100 heaviest packages:');
  packageSizes.slice(0, 100).forEach((pkg, index) => {
    console.log(`${index + 1}. ${pkg.name} - ${(pkg.size / 1024 / 1024).toFixed(2)} MB`);
  });
};

findHeaviestPackage();
