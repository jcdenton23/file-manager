import { printCPUInfo, printHomedir, printUsername, printArchitecture } from './src/os/index.js';
import { changeToHomeDirectory, getCommandLineArguments, printCurrentDirectory } from './src/utils.js';

const bootstrap = () => {
  changeToHomeDirectory();
  const username = getCommandLineArguments();
  console.log('Please enter a command:');

  const commands = {
    'os --cpus': printCPUInfo,
    'os --homedir': printHomedir,
    'os --username': printUsername,
    'os --architecture': printArchitecture,
    '.exit': () => {
      console.log(`Thank you for using File Manager, ${username}, goodbye!`);
      process.exit();
    },
  };

  process.stdin.on('data', async (chunk) => {
    const data = chunk.toString().trim();
    if (commands[data]) {
      await commands[data]();
    } else {
      console.log(`Invalid input: ${data}.`);
    }
    printCurrentDirectory();
  });

  process.on('SIGINT', () => {
    console.log(`\nThank you for using File Manager, ${username}, goodbye!`);
    process.exit();
  });
};

bootstrap();
