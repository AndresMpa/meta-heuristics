// CLI options
import { logsForBigScreens } from '../cli/handler.js';
// Data handlers
import { getSample } from '../dataHandlers/store.js';
// Utilities
import {
  random,
  getIndexes,
  getGreatest,
  fillUpToZero,
} from '../util/helpers.js';

/*
  Generate schemes using a generic structure
*/
const schemaGenerator = (schema, data, method, template, flag = true) => {
  let greatest = getGreatest(data[method], template, flag);
  greatest = getIndexes(data[method], greatest);
  greatest.forEach((index) => {
    schema['schema'][index] = 1;
    schema['cost'][0] += data['cost'][index];
    schema['volume'][0] += data['volume'][index];

    updateSampleData(data, index);
  });
  schema['methods'].push(method);
};

/*
  Update data for final simulation file
*/
const updateSampleData = (data, index) => {
  data['cost'][index] = null;
  data['volume'][index] = null;
  data['kFactor'][index] = null;
  data['costVolume'][index] = null;
};

/*
  Update volume for simulation
*/
const updateVolume = (data, simulation) => {
  const totalVolume = data['volume'].reduce((current, counter) => {
    return current + counter;
  }, 0);

  simulation['limitVolume'] = totalVolume / (2 * 4);
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
        schema['schema'][index] = 1;
        schema['cost'][0] += data['cost'][index];
        schema['volume'][0] += data['volume'][index];

        updateSampleData(data, index);
      });
      schema['methods'].push('random');
    },
  };

  schemas[option]();
};

const getInitialSchema = (simulation, options) => {
  const data = getSample();

  fillUpToZero(data['cost'], simulation['schema']);
  updateVolume(data, simulation);
  getSchema(data, simulation, options['schema'][0]);

  return data;
};

export { getSchema, updateVolume, getInitialSchema };
