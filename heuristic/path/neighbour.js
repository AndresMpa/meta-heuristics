import { getProcessData } from '../../util/process.js';
import { getSchema } from '../../schema/generator.js';
import { random } from '../../util/helpers.js';

/*
  Once a neighbour have been chosen this function simply
  takes its data to update simulation
*/
const selectedNeighbour = (neighborhood, target, field) => {
  const selected = neighborhood.findIndex((neighbour) => {
    return neighbour[field] === target;
  });
  return selected;
};

/*
  Update simulation data to track progress
*/
const updateSimulation = (simulation, choosenNeighbour) => {
  simulation['cost'] = choosenNeighbour['cost'];
  simulation['volume'] = choosenNeighbour['volume'];
  simulation['schema'] = choosenNeighbour['schema'];
  simulation['methods'] = choosenNeighbour['methods'];
  simulation['factible'] = choosenNeighbour['factible'];
};

/*
  It improves a bit possibilities to get the better neighbour
  form a neighborhood when simulation is reaching for the end
*/
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

/*
  It chose a neighbour from a neighborhood using
  a random criterion
*/
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

/*
  This function creates a Banach's ball using data
  from simulation
*/
const generateNeighbour = (data, simulation) => {
  const methods = ['c', 'v', 'o', 'k', 'r'];
  const method = methods[random(0, methods.length)];
  getSchema(data, simulation, method, { use: false, data: [0, 1] });

  return simulation;
};

/*
  It creates a Banach's ball then it chose a neighbour from a
  generated neighborhood under any IS,
*/
const generateNeighborhood = (data, simulation, size = 3) => {
  const neighborhood = [...Array(size).keys()].map(() => {
    return generateNeighbour(data, structuredClone(simulation));
  });

  if (getProcessData().LOGGER === "1") {
    console.group('Neighborhood');
    console.log(neighborhood);
    console.groupEnd('Neighborhood');
  }

  let choosenNeighbour = chooseNextNeighbour(neighborhood);
  checkNeighbour(choosenNeighbour, simulation, neighborhood);

  if (getProcessData().LOGGER === "1") {
    console.group('Choosen neighborhood');
    console.log(choosenNeighbour);
    console.groupEnd('Choosen neighborhood');
  }

  updateSimulation(simulation, choosenNeighbour);

  return choosenNeighbour;
};

export { generateNeighborhood };
