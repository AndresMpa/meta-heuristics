import { getProcessData } from '../../../util/process.js';
import { dotProduct } from '../../../util/helpers.js';

const pathRelinking = (simulation, iterations) => {
  const simpleHistory = iterations.map((step) => step[1]);

  const lastFeasible = simpleHistory.filter(
    (path) => path.factible[0] === true
  );

  simulation = lastFeasible;
};

export { pathRelinking };
