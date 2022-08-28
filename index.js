import { fillUpToZero, getSchema } from './util/helpers.js';
import { getSample } from './dataHandlers/store.js';

let schema = [];

const simulate = () => {
  const data = getSample();
  fillUpToZero(data['cost'], schema);
  getSchema(data, schema, "k");
  console.log(schema)
};

simulate();
