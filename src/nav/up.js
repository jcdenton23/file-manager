import { dirname } from 'path';
import { cwd } from 'process';
import { cd } from './cd.js';

export const up = async () => {
  const currentDir = cwd();
  const parentDir = dirname(currentDir);

  if (currentDir === parentDir) {
    console.error('Already at the root directory, cannot go up.');
    return;
  }

  await cd(parentDir);
};
