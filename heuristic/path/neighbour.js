import { getProcessData } from '../../util/process.js';
import { getSchema } from '../../schema/generator.js';
import { random } from '../../util/helpers.js';

/*
  Once a neighbour have been chosen this function simply
  takes its data to update simulation
*/
const selectedNeighbour = (neighborhood, target, field) => {
  const selected = neighborhood.findIndex((neighbour) => {
    return neighbour[field][0] === target;
  });

  return selected;
};

/*
  Update simulation data to track progress
*/
const updateSimulation = (simulation, choosenNeighbour) => {
  simulation['cost'] = choosenNeighbour['cost'];
  simulation['volume'] = choosenNeighbour['volume'];
  simulation['factible'] = choosenNeighbour['factible'];

  simulation['schema'] = choosenNeighbour['schema'];
  simulation['methods'] = choosenNeighbour['methods'];
};

/*
  It improves a bit possibilities to get the better neighbour
  form a neighborhood when simulation is reaching for the end
*/
const checkNeighbour = (neighbour, simulation, alternative) => {
  if (neighbour['volume'][0] > simulation['limitVolume']) {
    neighbour['factible'][0] = false;

    alternative.forEach((possibleOtherNeighbour) => {
      if (possibleOtherNeighbour['volume'][0] < simulation['limitVolume']) {
        neighbour['cost'][0] = possibleOtherNeighbour['cost'][0];
        neighbour['volume'][0] = possibleOtherNeighbour['volume'][0];
        neighbour['factible'][0] = possibleOtherNeighbour['factible'][0];

        neighbour['schema'] = possibleOtherNeighbour['schema'];
        neighbour['methods'] = possibleOtherNeighbour['methods'];
      }
    });
  } else {
    neighbour['factible'][0] = true;
  }
};

/*
  It chose a neighbour from a neighborhood using
  a random criterion
*/
const chooseNextNeighbour = (possible) => {
  const methods = ['c', 'v']; //'o', 'k', 'r'];
  const method = methods[random(0, methods.length)];
  let index = 0;

  switch (method) {
    case 'c': {
      const maxCost = Math.max(
        ...possible.map((neighbour) => neighbour['cost'][0])
      );
      index = selectedNeighbour(possible, maxCost, 'cost');
      break;
    }
    case 'v': {
      const minVolume = Math.min(
        ...possible.map((neighbour) => neighbour['volume'][0])
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

  if (simulation['cost'].length > 1) {
    simulation['factible'] = simulation['factible'][0];
    simulation['volume'] = simulation['volume'][0];
    simulation['cost'] = simulation['cost'][0];
  }

  getSchema(data, simulation, method, { use: false, data: [0, 1] });

  return simulation;
};

/*
  It creates a Banach's ball then it chose a neighbour from a
  generated neighborhood under any IS,
*/
const generateNeighborhood = (
  data,
  simulation,
  size = getProcessData().SOLUTION_SIZE
) => {
  const neighborhood = [];
  let index;

  for (index = 0; index < size; index++) {
    neighborhood.push(generateNeighbour(data, structuredClone(simulation)));
  }

  if (getProcessData().LOGGER === '1') {
    console.group('Neighborhood');
    console.log(neighborhood);
    console.groupEnd('Neighborhood');
  }

  let choosenNeighbour = chooseNextNeighbour(neighborhood);
  checkNeighbour(choosenNeighbour, simulation, neighborhood);

  if (getProcessData().LOGGER === '1') {
    console.group('Choosen neighborhood');
    console.log(choosenNeighbour);
    console.groupEnd('Choosen neighborhood');
  }

  updateSimulation(simulation, choosenNeighbour);

  return choosenNeighbour;
};

export { generateNeighborhood };
