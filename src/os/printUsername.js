import os from 'os';

export const printUsername = () => {
  console.log(`Username: ${os.userInfo().username}`);
};
