import os from 'os';

export const printEOL = () => {
  console.log(`Default system End-Of-Line (EOL) is: ${JSON.stringify(os.EOL)}`);
};
