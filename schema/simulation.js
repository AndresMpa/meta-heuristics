import { random } from '../util/helpers.js';
import { getSchema } from './generator.js';

const generateNeighbour = (data, simulation) => {
  const methods = ['c', 'v', 'o', 'k', 'r'];
  const method = methods[random(0, methods.length)];
  getSchema(data, simulation, method, { use: false, data: [0, 1] });

  return simulation;
};

const generateNeighborhood = (data, simulation, size = 3) => {
  const neighborhood = [...Array(size).keys()].map(() => {
    return generateNeighbour(data, structuredClone(simulation));
  });

  const choosenNeighbour = neighborhood[random(0, neighborhood.length)];
  console.log(choosenNeighbour);

  simulation['cost'] = choosenNeighbour['cost'];
  simulation['volume'] = choosenNeighbour['volume'];
  simulation['schema'] = choosenNeighbour['schema'];
  simulation['methods'] = choosenNeighbour['methods'];
};

export { generateNeighborhood };
