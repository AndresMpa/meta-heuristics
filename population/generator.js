// Process context
import { getProcessData } from '../util/process.js';
// Data handlers
import { getSample } from '../dataHandlers/store.js';
// Population handler
import { populate, fixSingle } from './handler.js';
// Utilities
import {
  random,
  dotProduct,
  getIndexes,
  getGreatest,
  updateVolume,
  fillUpToZero,
  hammingDistance,
} from '../util/helpers.js';

// Get empty DNA string of chromosomes
const getDNA = (data, simulation, size) => {
  let dna = {
    genotype: [],
    schema: [],
  };
  let index;

  fillUpToZero(data['cost'], dna['schema']);
  for (index = 0; index < size; index++) {
    dna['genotype'].push(dna['schema']);
  }

  simulation['schema'].push(dna['genotype']);

  delete dna['schema'];
  delete dna['genotype'];
};

const checkInbreeding = (population) => {
  let failures = [];
  let index;

  for (index = 0; index < population.length - 2; index++) {
    if (hammingDistance(population[index], population[index + 1]) < 4) {
      failures.push[(index, index + 1)];
    }
  }

  return failures;
};

const inbreedingHandler = (data, simulation) => {
  let inbred = checkInbreeding(simulation);

  while (inbred.length > 0) {
    inbred.forEach((failures) => {
      fixSingle(failures[0]);
      fixSingle(failures[1]);
    });
    inbred = checkInbreeding(simulation);
  }
};

const updatePopulationData = (data, simulation, characteristic) => {
  simulation[characteristic] = simulation['schema'][0].map((single) => {
    return dotProduct(data[characteristic], single);
  });
};

const getInitialPopulation = (
  simulation,
  options,
  size = getProcessData().SOLUTION_SIZE
) => {
  const data = getSample();

  getDNA(data, simulation, size);
  updateVolume(data, simulation);
  populate(data, simulation);
  inbreedingHandler(data, simulation['schema'][0]);
  updatePopulationData(data, simulation, 'cost');
  updatePopulationData(data, simulation, 'volume');

  return data;
};

export { getInitialPopulation };
