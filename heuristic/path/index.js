// Schemes handlers
import { getInitialSchema } from '../../schema/generator.js';
import { generateNeighborhood } from './neighbour.js';
// Utilities
import { pathResults } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
import { isZero } from '../../util/helpers.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

/*
  It generates a simulation for process epochs
*/
const pathSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();
  const initialSchema = getInitialSchema(simulation, options);
  const data = initialSchema;

  if (getProcessData().LOGGER === '1') {
    console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
    console.log(simulation);
  }

  iterations.push(structuredClone(simulation));

  while (
    simulation['limitVolume'] >= simulation['volume'] &&
    isZero(simulation['schema'])
  ) {
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

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
  }

  if (iterations.length === 1) {
    iterations.push(iterations[0]);
  }

  const timeEnd = performance.now();

  if (options.keep) {
    if (getProcessData().LOGGER === '1') {
      pathResults(
        simulation,
        iterations[iterations.length - 2][1],
        iterations.length,
        timeEnd - timeStart,
        epoch,
        options
      );
    }

    makeFile(
      JSON.stringify(iterations),
      epoch,
      options.id,
      'json',
      'logs/',
      '.'
    );
  } else {
    if (getProcessData().LOGGER === '1') {
      pathResults(
        simulation,
        iterations[iterations.length - 2],
        iterations.length,
        timeEnd - timeStart,
        epoch,
        options
      );
    }
  }
};

export default { pathSimulation };
