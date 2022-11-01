// Schemes handlers
import { getInitialSchema } from '../../generators/schema/generator.js';
import { generateNeighborhood } from './neighbour.js';
// Utilities
import { pathResults } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
import { isZero } from '../../util/helpers.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

/*
  Let simulation run when I meet the constrains
*/
const running = (simulation) => {
  let index = simulation['volume'].length - 1;
  let state = false;
  if (simulation['limitVolume'] >= simulation['volume'][index]) {
    if (isZero(simulation['schema'])) {
      state = true;
    }
  }
  return state;
};

/*
  It generates a simulation for process epochs
*/
const pathSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();
  const data = getInitialSchema(simulation, options);

  if (getProcessData().LOGGER === '1') {
    console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
    console.log(simulation);
  }

  iterations.push(structuredClone([data, simulation]));

  while (running(simulation)) {
    if (getProcessData().LOGGER === '1') {
      console.log(`Iteration ${iterations.length}: `);
      console.log('State of data:');
      console.log(data);
    }

    if (options.keep) {
      iterations.push([
        structuredClone(data),
        structuredClone(generateNeighborhood(data, simulation)),
      ]);
    } else {
      iterations.push(structuredClone(generateNeighborhood(data, simulation)));
    }
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
    pathResults(
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

export default { pathSimulation };
