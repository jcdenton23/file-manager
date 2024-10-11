import os from 'os';

export const printCPUInfo = () => {
  const cpus = os.cpus();
  const totalCpus = cpus.length;

  console.log(`Total number of CPUs: ${totalCpus}`);

  cpus.forEach((cpu, index) => {
    const model = cpu.model;
    const speedInGHz = (cpu.speed / 1000).toFixed(2);
    console.log(`CPU ${index + 1}:`);
    console.log(`  Model: ${model}`);
    console.log(`  Clock Rate: ${speedInGHz} GHz`);
  });
};
