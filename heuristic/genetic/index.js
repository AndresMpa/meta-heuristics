// Schemes handlers
import { getInitialPopulation } from '../../generators/population/generator.js';
// Population utilities
import {
  getGreatestIndividuals,
  calculateGreatestCharacteristics,
} from './population/greatest.js';
// Utilities
import { geneticResults, geneticInteration } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const running = (current) =>
  getProcessData().ITERATION_LIMIT < current ? true : false;

const geneticSimulation = (population, generations, epoch, options) => {
  const timeStart = performance.now();

  const populationData = getInitialPopulation(population);
  const greatestIndividuals = getGreatestIndividuals(
    populationData,
    population
  );
  calculateGreatestCharacteristics(populationData, population, greatestIndividuals);

  generations.push([populationData, population, greatestIndividuals]);

  if (getProcessData().LOGGER === '1') {
    geneticInteration(generations);
  }

  while (running(generations.length)) {
    if (getProcessData().LOGGER === '1') {
      geneticInteration(generations);
    }
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
    geneticResults(
      population,
      generations[generations.length - 2],
      generations.length,
      timeEnd - timeStart,
      epoch,
      options
    );
  }

  if (options.keep) {
    makeFile(
      JSON.stringify(generations),
      epoch,
      options.id,
      'json',
      'logs/',
      '.'
    );
  }
};

export default { geneticSimulation };
