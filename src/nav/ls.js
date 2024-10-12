import { cwd } from 'process';
import fs from 'fs/promises';

export const ls = async () => {
  const currentDir = cwd();
  try {
    const files = await fs.readdir(currentDir, { withFileTypes: true });
    const allFiles = files.map((file) => {
      const name = file.name;
      const type = file.isDirectory() ? 'directory' : 'file';
      return {
        name,
        type,
      };
    });

    console.table(allFiles);
  } catch (err) {
    console.error(`Error reading directory: ${err.message}`);
  }
};
