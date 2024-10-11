import os from 'os';

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
