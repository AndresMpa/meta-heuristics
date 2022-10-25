// Schemes handlers
import { getInitialPopulation } from '../../population/generator.js';
// Utilities
//import { geneticResults } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const geneticSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();
  const genotype = getInitialPopulation(simulation, options);

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
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
  }
};

export default { geneticSimulation };
