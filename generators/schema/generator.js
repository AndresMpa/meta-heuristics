// Data handlers
import { getSample } from '../../dataHandlers/store.js';
// Utilities
import {
  random,
  getIndexes,
  getGreatest,
  updateVolume,
  fillUpToZero,
} from '../../util/helpers.js';

/*
  Generate schemes using a generic structure
*/
const schemaGenerator = (schema, data, method, template, flag = true) => {
  let greatest = getGreatest(data[method], template, flag);
  greatest = getIndexes(data[method], greatest);
  greatest.forEach((index) => {
    schema.schema[index] = 1;
    schema.cost[0] += data.cost[index];
    schema.volume[0] += data.volume[index];
  });
  schema.methods.push(`${method}-method`);
};

// It returns schemes under various options
const getSchema = (
  data,
  schema,
  option = 'r',
  useTemplate = { use: true, template: [] }
) => {
  const template = useTemplate['use']
    ? [0, data['cost'].length * 0.1]
    : useTemplate['data'];

  const schemas = {
    // Get schema using the greatest costs
    c: () => schemaGenerator(schema, data, 'cost', template),
    // Get schema using the minors volumes
    v: () => schemaGenerator(schema, data, 'volume', template, false),
    // Get schema using the greatest costs over volumes
    o: () => schemaGenerator(schema, data, 'costVolume', [0, template]),
    // Get schema using the greatest k factors
    k: () => schemaGenerator(schema, data, 'kFactor', template),
    // Get schema using random values
    r: () => {
      [...Array(template[1]).keys()].forEach((_) => {
        let index = random(0, data['cost'].length);
        schema.schema[index] = 1;
        schema.cost[0] += data['cost'][index];
        schema.volume[0] += data['volume'][index];
      });
      schema['methods'].push('Random-method');
    },
  };

  schemas[option]();
};

const getInitialSchema = (simulation, options) => {
  const data = getSample();

  fillUpToZero(data['cost'], simulation.schema);
  updateVolume(data, simulation);
  getSchema(data, simulation, options.schema[0]);

  return data;
};

export { getSchema, updateVolume, getInitialSchema };
