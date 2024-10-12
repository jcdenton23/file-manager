import os from 'os';
import fs from 'fs/promises';

export const changeToHomeDirectory = () => {
  try {
    const homeDirectory = os.homedir();
    process.chdir(homeDirectory);
  } catch (error) {
    console.error('Error changing directory:', error);
  }
};

export const printCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

export const getCommandLineArguments = () => {
  const args = process.argv.slice(2);
  const usernameArg = args.find((arg) => arg.startsWith('--username='));
  const username = usernameArg ? usernameArg.split('=')[1] : null;

  if (username) {
    console.log(`Welcome to the File Manager, ${username}!`);
  } else {
    console.log('No username provided. You can start by providing a username with --username=your_username');
  }

  return username;
};

export const validateArgs = (args, expectedCount) => {
  if (args.length !== expectedCount) {
    console.error(`Expected ${expectedCount} argument(s), but got ${args.length}.`);
    return false;
  }
  return true;
};

export const isDirectory = async (path) => {
  try {
    const stats = await fs.stat(path);
    return stats.isDirectory();
  } catch {
    return false;
  }
};
