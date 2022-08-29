import { random } from '../util/helpers.js';
import { getSchema } from './generator.js';

const selectedNeighbour = (neighborhood, target) => {
  const selected = neighborhood.findIndex((neighbour) => {
    return neighbour.cost === target;
  });
  return selected;
};

const updateSimulation = (simulation, choosenNeighbour) => {
  simulation['cost'] = choosenNeighbour['cost'];
  simulation['volume'] = choosenNeighbour['volume'];
  simulation['schema'] = choosenNeighbour['schema'];
  simulation['methods'] = choosenNeighbour['methods'];
  simulation['factible'] = choosenNeighbour['factible'];
};

const checkNeighbour = (neighbour, simulation) => {
  neighbour['factible'] = neighbour['volume'] <= simulation['limitVolume'];
};

const chooseNextNeighbour = (possible) => {
  const methods = ['c', 'v', 'o', 'k', 'r'];
  const method = methods[random(0, methods.length)];

  let index = 0;

  switch (method) {
    case 'c': {
      const maxCost = Math.max(...possible.map((neighbour) => neighbour.cost));
      index = selectedNeighbour(possible, maxCost);
      break;
    }
    case 'v': {
      const minCost = Math.min(...possible.map((neighbour) => neighbour.cost));
      index = selectedNeighbour(possible, minCost);
      break;
    }

    case 'r': {
      index = random(0, possible.length);
      break;
    }
  }

  return possible[index];
};

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

  /*
  console.group('Neighborhood');
  console.log(neighborhood);
  console.groupEnd('Neighborhood');
  */

  const choosenNeighbour = chooseNextNeighbour(neighborhood);
  checkNeighbour(choosenNeighbour, simulation);

  /*
  console.group('Choosen neighborhood');
  console.groupEnd('Choosen neighborhood');
  */

  console.log(choosenNeighbour['factible']);

  updateSimulation(simulation, choosenNeighbour);

  return choosenNeighbour;
};

export { generateNeighborhood };
