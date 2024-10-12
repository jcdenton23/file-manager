import fs from 'fs/promises';
import { normalize, resolve } from 'path';
import { cwd } from 'process';

export const renameFile = async (oldPath, newPath) => {
  await fs.rename(resolve(cwd(), normalize(oldPath)), resolve(cwd(), normalize(newPath)));
  console.log(`File renamed to ${newPath}.`);
};
