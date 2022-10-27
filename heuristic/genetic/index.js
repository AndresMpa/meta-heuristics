// Schemes handlers
import { getInitialPopulation } from '../../population/generator.js';
// Utilities
import { geneticResults, geneticInteration } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const running = (current) =>
  getProcessData().ITERATION_LIMIT < current ? true : false;

const geneticSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();

  const genotype = getInitialPopulation(simulation, options);

  iterations.push([genotype, simulation])
  
  geneticInteration(iterations);

  while (running(iterations.length)) {
    if (getProcessData().LOGGER === '1') {
      geneticInteration(iterations);
    }
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
    geneticResults(
      simulation,
      iterations[iterations.length - 2],
      iterations.length,
      timeEnd - timeStart,
      epoch,
      options
    );
  }

  if (options.keep) {
    makeFile(
      JSON.stringify(iterations),
      epoch,
      options.id,
      'json',
      'logs/',
      '.'
    );
  }
};

export default { geneticSimulation };
