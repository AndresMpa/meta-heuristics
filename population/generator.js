// Process context
import { getProcessData } from '../util/process.js';
// Data handlers
import { getSample } from '../dataHandlers/store.js';
// Utilities
import {
  random,
  getIndexes,
  getGreatest,
  updateVolume,
  fillUpToZero,
  hammingDistance,
} from '../util/helpers.js';

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

  simulation['schema'] = dna['genotype'];

  delete dna['schema'];
  delete dna['genotype'];
};

const checkInbreeding = (simulation) => {
  let failures = [];
  let newFailure;
  simulation['schema'].forEach((genotype, index) => {
    simulation['schema'].forEach((item, failIndex) => {
      if (hammingDistance(genotype, item) < 4 && index !== failIndex) {
        newFailure = failures.findIndex((item) => {
          return item[0] === failIndex && item[1] === index;
        });
        if (newFailure === -1) {
          failures.push([index, failIndex]);
        }
      }
    });
  });
  return failures;
};

const inbreedingHandler = (data, simulation) => {
  let inbred = checkInbreeding(simulation);

  while (inbred.length > 0) {
    inbred.forEach((failures) => {
      //console.log(failures[0], failures[1]);
    });
    inbred = checkInbreeding(simulation);
  }
};

const getInitialPopulation = (
  simulation,
  options,
  size = getProcessData().SOLUTION_SIZE
) => {
  const data = getSample();

  getDNA(data, simulation, size);
  updateVolume(data, simulation);
  inbreedingHandler(data, simulation);

  const population = [];
  return population;
};

export { getInitialPopulation };
