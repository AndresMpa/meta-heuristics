import { fillUpToZero, getSchema, cliHandler } from './util/helpers.js';
import { getSample } from './dataHandlers/store.js';

let schema = [];

const simulate = () => {
  const options = cliHandler();
  const data = getSample();
  fillUpToZero(data['cost'], schema);
  getSchema(data, schema, options["shema"]);
  console.log(schema);
};

simulate();
