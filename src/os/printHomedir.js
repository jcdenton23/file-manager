import os from 'os';

export const printHomedir = () => {
  console.log(`Homedir: ${os.homedir()}`);
};
