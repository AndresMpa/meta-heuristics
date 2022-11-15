// Schemes handlers (Preprocessinng)
import { getInitialSchema } from '../../generators/schema/generator.js';
// Building
import { buildRLC } from './build/RLC.js';
import { updatePath } from './build/update.js';
// Search
import { pathRelinking } from './search/pathRelinking.js'
// Utilities
import { graspResults, graspIteration } from '../../util/information.js';
import { getProcessData } from '../../util/process.js';
// Data handlers
import { makeFile } from '../../dataHandlers/fileHandler.js';

/*
  Let simulation run when I meet the constrains
*/
const running = (pathRelinking) =>
  pathRelinking < getProcessData().ITERATION_LIMIT;

const graspSimulation = (simulation, iterations, epoch, options) => {
  const timeStart = performance.now();
  // This is equivalent to preprocessinng stage
  const data = getInitialSchema(simulation, options);
  let pathRelinkingCounter = 0;
  let rlc;

  if (getProcessData().LOGGER === '1') {
    graspIteration(simulation, rlc);
  }

  iterations.push(structuredClone([data, simulation, rlc]));

  /*
    Iterations execution
  */
  while (running(pathRelinkingCounter)) {
    rlc = buildRLC(data, simulation);
    updatePath(data, simulation, rlc);
    if (!simulation.factible[0]) {
      pathRelinking(simulation, iterations);
      pathRelinkingCounter++;
    }

    if (getProcessData().LOGGER === '1') {
      graspIteration(simulation, rlc);
    }
  }

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    graspResults(
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

export default { graspSimulation };
