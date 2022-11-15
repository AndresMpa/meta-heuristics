import { dotProduct } from '../../../util/helpers.js';

const updatePath = (data, simulation, rlc) => {
  simulation.schema = rlc[2].schema;
  simulation.factible[0] = rlc[2].feasible;
  simulation.volume[0] = dotProduct(simulation.schema, data.volume);
  simulation.cost[0] = dotProduct(simulation.schema, data.cost);
};

export { updatePath };
