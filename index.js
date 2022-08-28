import { getSample } from './dataHandlers/store.js';
import { getSchema } from './schema/generator.js';
import { fillUpToZero } from './util/helpers.js';
import { cliHandler } from './cli/handler.js';

let simulation = {
  factible: true,
  methods: [],
  schema: [],

  volume: 0,
  cost: 0,
};

const simulate = () => {
  const data = getSample();
  const options = cliHandler();

  fillUpToZero(data['cost'], simulation['schema']);
  getSchema(data, simulation, options['shema']);

  console.log(simulation);
};

simulate();
