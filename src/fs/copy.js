import fs from 'fs';
import { normalize, resolve, dirname } from 'path';
import { cwd } from 'process';
import { pipeline } from 'stream/promises';

export const copyFile = async (sourcePath, destPath) => {
  const source = resolve(cwd(), normalize(sourcePath));
  const destination = resolve(cwd(), normalize(destPath));

  const destDir = dirname(destination);

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const readableStream = fs.createReadStream(source);
  const writableStream = fs.createWriteStream(destination);

  await pipeline(readableStream, writableStream);
  console.log(`File copied to ${destination}.`);
};
