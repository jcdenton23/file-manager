import os from 'os';

export const printArchitecture = () => {
  const architecture = os.arch();
  console.log(`CPU architecture: ${architecture}`);
};
