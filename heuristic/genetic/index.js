// Schemes handlers
import { getInitialSchema } from '../../schema/generator.js';
// Utilities
import { isZero } from '../../util/helpers.js';
//import { results } from '../../util/information.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

const geneticSimulation = (simulation, iterations) => {
  const data = getInitialSchema(simulation)

  const timeStart = performance.now();
  const timeEnd = performance.now();
};

export default { geneticSimulation };
