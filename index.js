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

const results = (time, options) => {
  console.group('----------------Simulation results----------------');
  console.group('Results:');
  console.group(`Simulation:`);
  console.log(`Simulation got a max cost of: ${simulation.cost}`);
  console.log(`Simulation got a min volume of: ${simulation.volume}`);
  console.log(`Simulation used methods:`);
  console.log(simulation.methods);
  console.log('Simulation got schema:');
  console.log(simulation.schema);
  console.groupEnd('Simulation got:');
  console.groupEnd('Results:');

  console.group('Performance');
  console.group(`Simulation took:`);
  console.log(`${time} miliseconds`);
  console.log(`${iterations.length} iterations`);
  console.groupEnd('Simulation took:');
  console.groupEnd('Performance');

  console.group('Extras');
  console.log(
    `Simulation terminated due to factiblility: ${simulation.factible}`
  );
  if (options.keep) {
    console.log(`Find extra log information on ./logs/${options.id}.txt`);
  }
  console.groupEnd('Extra');

  console.groupEnd('----------------Simulation result----------------');
};

const simulate = () => {
  const data = getSample();
  const options = cliHandler();

  const timeStart = performance.now();

  fillUpToZero(data['cost'], simulation['schema']);
  updateVolume(data, simulation);

  getSchema(data, simulation, options['schema'][0]);

  console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
  console.log(simulation);

  iterations.push(simulation);

  while (simulation['limitVolume'] >= simulation['volume']) {
    console.log(`Iteration ${iteration()}: `);
    generateNeighborhood(data, simulation);
    if (simulation['factible']) {
      iterations.push(simulation);
    }
  }

  console.log('Simulation terminated');

  const timeEnd = performance.now();

  setTimeout(() => {
    results(timeEnd - timeStart, options);
  }, 1000);
};

simulate();
