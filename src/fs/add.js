import fs from 'fs/promises';
import { normalize, resolve } from 'path';

export const createEmptyFile = async (fileName) => {
  const normalizedFileName = normalize(fileName);
  const filePath = resolve(process.cwd(), normalizedFileName);

  let fileHandle;
  try {
    fileHandle = await fs.open(filePath, 'wx');
    console.log(`File '${normalizedFileName}' created successfully.`);
  } catch (err) {
    console.error('Operation failed');
  } finally {
    if (fileHandle) {
      await fileHandle.close();
    }
  }
};
