const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const fillUpToZero = (data, schema) => {
  data.forEach((_) => {
    schema.push(0);
  });
};

const getCurrentPath = (currentDir, target) => {
  return process.cwd().indexOf(currentDir) !== -1
    ? `${process.cwd().substring(process.cwd().lastIndexOf('/'), -1)}/${target}`
    : `${target}`;
};

/*
  Return array of greatest values in an array;

  array: It's a copy from your array
  values: Means number of needed numbers
  direction: Use true to get greatest or false to get minors
*/
const getGreatest = (array, values, direction = true) => {
  let rawArray = [...array];
  const order = direction ? (a, b) => b - a : (a, b) => a - b;
  const sortedArray = () => rawArray.sort(order);

  return sortedArray().slice(0, values);
};

/*
  Returns an array of indexes for some targeted data
*/
const getIndexes = (rawData, targets) => {
  let indexes = [];
  rawData.forEach((value, index) => {
    if (targets.includes(value)) {
      targets.splice(targets.indexOf(value), 1);
      indexes.push(index);
    }
  });
  return indexes;
};

// It returns schemas under various options
const getSchema = (data, schema, option) => {
  const template = data['cost'].length * 0.1;
  switch (option) {
    // Get schema using the greatest costs
    case 'c': {
      let greatestCosts = getGreatest(data['cost'], template);
      greatestCosts = getIndexes(data['cost'], greatestCosts);
      greatestCosts.forEach((index) => {
        schema[index] = 1;
      });
      break;
    }
    // Get schema using the greatest volumes
    case 'v': {
      let greatestVolume = getGreatest(data['volume'], template, false);
      greatestVolume = getIndexes(data['volume'], greatestVolume);
      greatestVolume.forEach((index) => {
        schema[index] = 1;
      });
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
        schema[index] = 1;
      });
      break;
    }
    // Get schema using the greatest k factors
    case 'k': {
      let greatestKFactor = getGreatest(data['kFactor'], template);
      greatestKFactor = getIndexes(data['kFactor'], greatestKFactor);
      greatestKFactor.forEach((index) => {
        schema[index] = 1;
      });
      break;
    }
    // Get schema using random values
    default: {
      [...Array(template).keys()].forEach((_) => {
        schema[random(0, data['cost'].length)] = 1;
      });
      break;
    }
  }
};

const cliHandler = () => {
  const options = {
    keep: false,
    shema: 0,
  };
  const argvs = process.argv;
  if (argvs.length > 4) {
    throw new Error('Unknow actions');
  }

  options['keep'] = argvs.slice(2) === 'k' ? true : false;

  if (argvs.slice(3)) {
    let regrex = /[c|v|o|k]/g;
    if (regrex.test(argvs.slice(3))) {
      options['schema'] = argvs.slice(3);
    }
  }

  return options;
};

export { random, cliHandler, getSchema, fillUpToZero, getCurrentPath };
