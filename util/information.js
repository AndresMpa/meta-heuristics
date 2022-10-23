import { getProcessData } from './process.js';

/*
  A simple utility to show information under an structure
*/
const pathResults = (simulation, result, iterations, time, epoch, options) => {
  console.group('----------------Simulation results----------------');
  console.group('Results:');
  console.group(`Simulation:`);
  console.log(`Simulation got a max cost of: ${result.cost}`);
  console.log(`Simulation got a min volume of: ${result.volume}`);
  console.log(`Simulation fill up limit volume of: ${result.limitVolume}`);
  console.log(`Simulation used methods:`);
  console.log(result.methods);
  console.log('Simulation got schema:');
  console.log(result.schema);
  console.groupEnd('Simulation got:');
  console.groupEnd('Results:');

  console.group('Performance');
  console.group(`Simulation took:`);
  console.log(`${time} miliseconds`);
  console.log(`${iterations} iterations`);
  console.groupEnd('Simulation took:');
  console.groupEnd('Performance');

  console.group('Extras');
  console.log(
    `Simulation terminated due to factiblility: ${simulation.factible}`
  );

  console.group(`Last neighbour:`);
  console.log(`Neighbour suggested a cost of: ${simulation.cost}`);
  console.log(`Neighbour suggested a volume of: ${simulation.volume}`);
  console.log(
    `Neighbour used method: ${
      simulation.methods[simulation.methods.length - 1]
    }`
  );
  console.log('Neighbour suggested schema:');
  console.log(simulation.schema);
  console.groupEnd('Last neighbour:');

  if (options.keep) {
    console.log(
      `Find extra log information on ./logs/${options.id}_for_"${
        getProcessData().HEURISTIC
      }"_running_epoch_${epoch}_of_${getProcessData().EPOCHS}.json`
    );
  }
  console.groupEnd('Extra');

  console.groupEnd('----------------Simulation result----------------');
};

export { pathResults };
