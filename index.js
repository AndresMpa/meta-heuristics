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

const results = (result, time, options) => {
  console.group('----------------Simulation results----------------');
  console.group('Results:');
  console.group(`Simulation:`);
  console.log(`Simulation got a max cost of: ${result.cost}`);
  console.log(`Simulation got a min volume of: ${result.volume}`);
  console.log(`Simulation fill up limit volume of: ${result.limitVolume}`);
  console.log(`Simulation used methods:`);
  console.log(result.methods);
  console.log('Simulation got schema:');
  console.log(result.schema);
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

  console.group(`Last neighbour:`);
  console.log(`Neighbour suggested a cost of: ${simulation.cost}`);
  console.log(`Neighbour suggested a volume of: ${simulation.volume}`);
  console.log(
    `Neighbour used method: ${
      simulation.methods[simulation.methods.length - 1]
    }`
  );
  console.log('Neighbour suggested schema:');
  console.log(simulation.schema);
  console.groupEnd('Last neighbour:');

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
    console.log(`Iteration ${iterations.length}: `);
    console.log('State of data:');
    console.log(data);

    iterations.push(generateNeighborhood(data, simulation));
  }

  console.log('Simulation terminated');

  const timeEnd = performance.now();

  setTimeout(() => {
    results(iterations[iterations.length - 2], timeEnd - timeStart, options);
  }, 1000);
};

simulate();
