// Process context
import { getProcessData } from '../util/process.js';
// Data handlers
import { getSample } from '../dataHandlers/store.js';
// Population handlers
import { populate, fixSingle } from './handler.js';
// Post generation handlers
import {
  getGreatestIndividuals,
  identifyGreatestIndividuals,
} from './postGenerator.js';
// Utilities
import {
  dotProduct,
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

const inbreedingHandler = (data, population, feasible) => {
  let inbred = checkInbreeding(population, feasible);

  while (inbred.length > 0) {
    inbred.forEach((failures) => {
      failures.forEach((item) => {
        fixSingle(population, population.length - 1, item, feasible[item]);
      });
    });
    inbred = checkInbreeding(population);
  }
};

const updatePopulationData = (data, simulation, characteristic) => {
  simulation[characteristic] = simulation['schema'][0].map((individual) => {
    return dotProduct(data[characteristic], individual);
  });
};

const getInitialPopulation = (
  simulation,
  size = getProcessData().SOLUTION_SIZE
) => {
  const data = getSample();

  getDNA(data, simulation, size);
  updateVolume(data, simulation);
  populate(data, simulation);
  inbreedingHandler(data, simulation['schema'][0], simulation['factible']);
  updatePopulationData(data, simulation, 'volume');
  updatePopulationData(data, simulation, 'cost');
  let greatest = identifyGreatestIndividuals(structuredClone(simulation), []);
  getGreatestIndividuals(greatest, simulation);

  simulation['methods'].push('Initial');

  return [data, greatest];
};

export { getInitialPopulation };
