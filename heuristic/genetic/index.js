// Schemes handlers
import { getInitialPopulation } from '../../generators/population/generator.js';
// Population utilities
import {
  getGreatestIndividuals,
  calculateGreatestCharacteristics,
} from './population/greatest.js';
// Selection
import { selectIndividuals } from './selection/selectionHandler.js';
// Recombination
import { recombinateGenotypes } from './recombination/recombinationHandler.js';
// Mutation
import { generateMutation } from './mutation/mutationHandler.js';
// Utilities
import { geneticResults, geneticInteration } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const running = (current) => getProcessData().ITERATION_LIMIT > current;

const geneticSimulation = (population, generations, epoch, options) => {
  const timeStart = performance.now();
  /*
    Initial population generation
    Create the first population (Equivalent to create a species)
      E -> Process data
      P -> Create a population
      O -> Initial population
  */
  const populationData = getInitialPopulation(population);
  let greatestIndividuals = getGreatestIndividuals(populationData, population);
  calculateGreatestCharacteristics(
    populationData,
    population,
    greatestIndividuals
  );

  generations.push([populationData, population, greatestIndividuals]);

  if (getProcessData().LOGGER === '1') {
    geneticInteration(generations);
  }

  let selectedIndividuals;
  while (running(generations.length)) {
    /*
      Selection
      Choose which individuals will used for the next generation
        E -> Previous population
        P -> Choose individuals
        O -> List of individuals
    */
    selectedIndividuals = selectIndividuals(populationData, population);

    /*
      Recombination
      Creates a new population from a previous one
        E -> Previous population, Chosen individuals
        P -> Create a new population
        O -> New population
    */
    recombinateGenotypes(populationData, population, selectedIndividuals);

    /*
      Mutation
      Change some gens to mutate individuals
        E -> New population
        P -> Alter some individuals
        O -> Population with some mutations
    */
    generateMutation(populationData, population, options);

    // Update generations
    greatestIndividuals = getGreatestIndividuals(populationData, population);
    generations.push([populationData, population, greatestIndividuals]);

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
