import fs from 'fs';
import { normalize, resolve } from 'path';
import { printCurrentDirectory } from '../utils.js';
import { cwd } from 'process';

export const readFileAndPrint = async (filePath) => {
  const readableStream = fs.createReadStream(resolve(cwd(), normalize(filePath)), { encoding: 'utf-8' });

  readableStream.on('data', (chunk) => {
    console.log('\n' + chunk);
  });
  readableStream.on('error', () => {
    console.error('Operation failed');
  });
  readableStream.on('end', () => {
    printCurrentDirectory();
  });
};
