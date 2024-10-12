import { normalize, resolve } from 'path';
import { chdir, cwd } from 'process';
import { isDirectory } from '../utils.js';

export const cd = async (pathToDirectory) => {
  const cdDirectory = resolve(cwd(), normalize(pathToDirectory));
  const isDir = await isDirectory(cdDirectory);

  if (isDir) {
    chdir(cdDirectory);
    console.log(`Changed directory to ${cdDirectory}`);
  } else {
    console.error(`Error: "${cdDirectory}" is not a valid directory.`);
  }
};
