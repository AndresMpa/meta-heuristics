import { isZero, results, fillUpToZero } from '../util/helpers.js';
import { getSchema, updateVolume } from '../schema/generator.js';
import { generateNeighborhood } from '../schema/neighbour.js';
import { makeFile } from '../dataHandlers/fileHandler.js';
import { getSample } from '../dataHandlers/store.js';
import { cliHandler } from '../cli/handler.js';

const simulate = (simulation, iterations) => {
  const data = getSample();
  const options = cliHandler();

  const timeStart = performance.now();

  fillUpToZero(data['cost'], simulation['schema']);
  updateVolume(data, simulation);

  getSchema(data, simulation, options['schema'][0]);

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
    results(
      simulation,
      iterations[iterations.length - 2][1],
      iterations.length,
      timeEnd - timeStart,
      options
    );
  } else {
    results(
      simulation,
      iterations[iterations.length - 2],
      iterations.length,
      timeEnd - timeStart,
      options
    );
  }

  if (options.keep) {
    makeFile(JSON.stringify(iterations), 'json', 'logs/', '.', options.id);
  }
};

export { simulate };
