import fs from 'fs/promises';
import { normalize, resolve } from 'path';
import { cwd } from 'process';

export const deleteFile = async (filePath) => {
  const resolvedPath = resolve(cwd(), normalize(filePath));

  try {
    await fs.access(resolvedPath);
    await fs.unlink(resolvedPath);
    console.log(`File ${resolvedPath} deleted.`);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error(`File not found: ${resolvedPath}`);
    } else {
      console.error('Operation failed');
    }
  }
};
