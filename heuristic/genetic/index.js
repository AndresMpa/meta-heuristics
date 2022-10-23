// Schemes handlers
import { getInitialPopulation } from '../../population/generator.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const geneticSimulation = (simulation, iterations, options) => {
  const genotype = getInitialPopulation(simulation, options);

  const timeStart = performance.now();
  const timeEnd = performance.now();
};

export default { geneticSimulation };
