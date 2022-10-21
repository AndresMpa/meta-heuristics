// Schemes handlers
import { getInitialSchema } from '../../schema/generator.js';
import { generateNeighborhood } from './neighbour.js';
// Utilities
import { pathResults } from '../../util/information.js';
import { isZero } from '../../util/helpers.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

/*
  It generates a simulation for process epochs
*/
const pathSimulation = (simulation, iterations) => {
  const initialSchema = getInitialSchema(simulation);
  const data = initialSchema[0];
  const options = initialSchema[1];

  const timeStart = performance.now();

  console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
  console.log(simulation);

  iterations.push(structuredClone(simulation));

  while (
    simulation['limitVolume'] >= simulation['volume'] &&
    isZero(simulation['schema'])
  ) {
    console.log(`Iteration ${iterations.length}: `);
    console.log('State of data:');
    console.log(data);

    if (options.keep) {
      iterations.push([
        structuredClone(data),
        structuredClone(generateNeighborhood(data, simulation)),
      ]);
    } else {
      iterations.push(structuredClone(generateNeighborhood(data, simulation)));
    }
  }

  console.log('\n---------------Simulation terminated--------------\n');

  const timeEnd = performance.now();

  if (options.keep) {
    pathResults(
      simulation,
      iterations[iterations.length - 2][1],
      iterations.length,
      timeEnd - timeStart,
      options
    );

    makeFile(JSON.stringify(iterations), 'json', 'logs/', '.', options.id);
  } else {
    pathResults(
      simulation,
      iterations[iterations.length - 2],
      iterations.length,
      timeEnd - timeStart,
      options
    );
  }
};

export default { pathSimulation };
