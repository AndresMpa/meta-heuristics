import { getSchema, updateVolume } from './schema/generator.js';
import { generateNeighborhood } from './schema/simulation.js';
import { getSample } from './dataHandlers/store.js';
import { fillUpToZero } from './util/helpers.js';
import { cliHandler } from './cli/handler.js';

let iterations = [];
let simulation = {
  factible: true,
  methods: [],
  schema: [],

  limitVolume: 0,
  volume: 0,
  cost: 0,
};

const iteration = () => {
  return simulation['schema'].reduce((prev, count) => {
    return prev + count;
  }, 0);
};

const simulate = () => {
  const data = getSample();
  const options = cliHandler();

  fillUpToZero(data['cost'], simulation['schema']);
  updateVolume(data, simulation);

  getSchema(data, simulation, options['schema'][0]);

  console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
  console.log(simulation);

  iterations.push(simulation);

  while (simulation['limitVolume'] >= simulation['volume']) {
    console.log(`Iteration ${iteration()}: `);
    generateNeighborhood(data, simulation);
    iterations.push(simulation);
  }
};

simulate();
