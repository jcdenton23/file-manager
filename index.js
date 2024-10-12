import { copyFile, createEmptyFile, deleteFile, moveFile, readFileAndPrint, renameFile } from './src/fs/index.js';
import { calculateHash } from './src/hash/calculateHash.js';
import { cd, ls, up } from './src/nav/index.js';
import { printCPUInfo, printHomedir, printUsername, printArchitecture, printEOL } from './src/os/index.js';
import { changeToHomeDirectory, getCommandLineArguments, printCurrentDirectory, validateArgs } from './src/utils.js';
import { compressFile, decompressFile } from './src/zlib/index.js';
import { createInterface } from 'readline';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

const username = getCommandLineArguments();

const greetings = () => {
  changeToHomeDirectory();
  printCurrentDirectory();
  console.log('Please enter a command:');
  rl.prompt();
};

greetings();

const goodbye = () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  process.exit(0);
};

const commands = {
  'os --EOL': printEOL,
  'os --cpus': printCPUInfo,
  'os --homedir': printHomedir,
  'os --username': printUsername,
  'os --architecture': printArchitecture,

  compress: async (args = []) => {
    if (!validateArgs(args, 2)) return;
    const [inputPath, outputPath] = args;
    await compressFile(inputPath, outputPath);
  },

  decompress: async (args = []) => {
    if (!validateArgs(args, 2)) return;
    const [inputPath, outputPath] = args;
    await decompressFile(inputPath, outputPath);
  },

  cat: async (args = []) => {
    if (!validateArgs(args, 1)) return;
    const [filePath] = args;
    await readFileAndPrint(filePath);
  },

  add: async (args = []) => {
    if (!validateArgs(args, 1)) return;
    const [fileName] = args;
    await createEmptyFile(fileName);
  },

  rn: async (args = []) => {
    if (!validateArgs(args, 2)) return;
    const [oldPath, newFileName] = args;
    await renameFile(oldPath, newFileName);
  },

  cp: async (args = []) => {
    if (!validateArgs(args, 2)) return;
    const [sourcePath, destPath] = args;
    await copyFile(sourcePath, destPath);
  },

  mv: async (args = []) => {
    if (!validateArgs(args, 2)) return;
    const [sourcePath, destPath] = args;
    await moveFile(sourcePath, destPath);
  },

  rm: async (args = []) => {
    if (!validateArgs(args, 1)) return;
    const [filePath] = args;
    await deleteFile(filePath);
  },

  hash: async (args = []) => {
    if (!validateArgs(args, 1)) return;
    const [filePath] = args;
    calculateHash(filePath);
  },

  cd: async (args = []) => {
    if (!validateArgs(args, 1)) return;
    const [pathToDirectory] = args;
    console.log('ruuun');
    await cd(pathToDirectory);
  },

  up: async () => {
    await up();
  },

  ls: async () => {
    await ls();
  },

  '.exit': () => {
    rl.close();
  },
};

rl.on('line', async (chunk) => {
  const data = chunk.toString().trim();
  const [command, ...args] = data.split(' ');

  try {
    if (commands[data]) {
      await commands[data]();
    } else if (commands[command]) {
      await commands[command](args);
    } else {
      console.error(`Invalid input: ${data}.`);
    }
  } catch (e) {
    console.error('Operation failed');
  } finally {
    printCurrentDirectory();
    rl.prompt();
  }
}).on('close', goodbye);
