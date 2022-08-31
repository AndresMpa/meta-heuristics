import { random } from '../util/helpers.js';
import { getSchema } from './generator.js';

const selectedNeighbour = (neighborhood, target, field) => {
  const selected = neighborhood.findIndex((neighbour) => {
    return neighbour[field] === target;
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

const checkNeighbour = (neighbour, simulation, alternative) => {
  if (neighbour['volume'] > simulation['limitVolume']) {
    neighbour['factible'] = false;

    alternative.forEach((possibleOtherNeighbour) => {
      if (possibleOtherNeighbour['volume'] < simulation['limitVolume']) {
        neighbour['cost'] = possibleOtherNeighbour['cost'];
        neighbour['volume'] = possibleOtherNeighbour['volume'];
        neighbour['schema'] = possibleOtherNeighbour['schema'];
        neighbour['methods'] = possibleOtherNeighbour['methods'];
        neighbour['factible'] = possibleOtherNeighbour['factible'];
      }
    });
  } else {
    neighbour['factible'] = true;
  }
};

const chooseNextNeighbour = (possible) => {
  const methods = ['c', 'v', 'o', 'k', 'r'];
  const method = methods[random(0, methods.length)];

  let index = 0;

  switch (method) {
    case 'c': {
      const maxCost = Math.max(
        ...possible.map((neighbour) => neighbour['cost'])
      );
      index = selectedNeighbour(possible, maxCost, 'cost');
      break;
    }
    case 'v': {
      const minVolume = Math.min(
        ...possible.map((neighbour) => neighbour['volume'])
      );
      index = selectedNeighbour(possible, minVolume, 'volume');
      break;
    }
    default: {
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

  console.group('Neighborhood');
  console.log(neighborhood);
  console.groupEnd('Neighborhood');

  let choosenNeighbour = chooseNextNeighbour(neighborhood);
  checkNeighbour(choosenNeighbour, simulation, neighborhood);

  console.group('Chosen neighbour');
  console.log(choosenNeighbour);
  console.groupEnd('Chosen neighbour');

  updateSimulation(simulation, choosenNeighbour);

  return choosenNeighbour;
};

export { generateNeighborhood };
