import { random } from '../util/helpers.js';

// It returns schemas under various options
const getSchema = (data, schema, option) => {
  const template = data['cost'].length * 0.1;
  switch (option) {
    // Get schema using the greatest costs
    case 'c': {
      let greatestCosts = getGreatest(data['cost'], template);
      greatestCosts = getIndexes(data['cost'], greatestCosts);
      greatestCosts.forEach((index) => {
        schema['schema'][index] = 1;
        schema['cost'] += data['cost'][index];
        schema['volume'] += data['volume'][index];
      });
      schema["methods"].push("cost")
      break;
    }
    // Get schema using the greatest volumes
    case 'v': {
      let greatestVolume = getGreatest(data['volume'], template, false);
      greatestVolume = getIndexes(data['volume'], greatestVolume);
      greatestVolume.forEach((index) => {
        schema['schema'][index] = 1;
        schema['cost'] += data['cost'][index];
        schema['volume'] += data['volume'][index];
      });
      schema["methods"].push("volume")
      break;
    }
    // Get schema using the greatest costs over volumes
    case 'o': {
      let greatestCostsVolumens = getGreatest(data['costVolume'], template);
      greatestCostsVolumens = getIndexes(
        data['costVolume'],
        greatestCostsVolumens
      );
      greatestCostsVolumens.forEach((index) => {
        schema['schema'][index] = 1;
        schema['cost'] += data['cost'][index];
        schema['volume'] += data['volume'][index];
      });
      schema["methods"].push("costVolume")
      break;
    }
    // Get schema using the greatest k factors
    case 'k': {
      let greatestKFactor = getGreatest(data['kFactor'], template);
      greatestKFactor = getIndexes(data['kFactor'], greatestKFactor);
      greatestKFactor.forEach((index) => {
        schema['schema'][index] = 1;
        schema['cost'] += data['cost'][index];
        schema['volume'] += data['volume'][index];
      });
      schema["methods"].push("kFactor")
      break;
    }
    // Get schema using random values
    default: {
      [...Array(template).keys()].forEach((_) => {
        let index = random(0, data['cost'].length);
        schema['schema'][index] = 1;
        schema['cost'] += data['cost'][index];
        schema['volume'] += data['volume'][index];
      });
      schema["methods"].push("random")
      break;
    }
  }
};

export { getSchema };
