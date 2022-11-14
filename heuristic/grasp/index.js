// Schemes handlers (Preprocessinng)
import { getInitialSchema } from '../../generators/schema/generator.js';
// Building
import { buildRLC } from './build/RLC.js';
// Utilities
import { graspResults, graspIteration } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

/*
  Let simulation run when I meet the constrains
*/
const running = (simulation) => false;

const graspSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();
  // This is equivalent to preprocessinng stage
  const data = getInitialSchema(simulation, options);

  if (getProcessData().LOGGER === '1') {
    graspIteration(simulation);
  }

  iterations.push(structuredClone([data, simulation]));

  /*
    Iteration
  */

  buildRLC(data, simulation);

  while (running(simulation)) {
    if (getProcessData().LOGGER === '1') {
      graspIteration(simulation);
    }
  }

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    graspResults(
      simulation,
      iterations[iterations.length - 2],
      iterations.length,
      timeEnd - timeStart,
      epoch,
      options
    );
  }
  if (options.keep) {
    makeFile(
      JSON.stringify(iterations),
      epoch,
      options.id,
      'json',
      'logs/',
      '.'
    );
  }
};

export default { graspSimulation };
