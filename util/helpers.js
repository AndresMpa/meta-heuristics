/*
  Return a random number
*/
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/*
  Mathematically rounds a number
*/
const round = (number) => {
  let roundedNumber = Number((Math.abs(number) * 100).toPrecision(15));
  return (Math.round(roundedNumber) / 100) * Math.sign(number);
};

/*
  It fills an array (schema) in data size with zeros
*/
const fillUpToZero = (data, schema) => {
  data.forEach((_) => {
    schema.push(0);
  });
};

/*
  It returns a path from anywhere to a specific directory
*/
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

  return sortedArray().slice(values[0], values[1]);
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

/*
  Hamming distance between 2 arrays, then return
  distance as a number
*/
const hammingDistance = (value, compare) => {
  let distance = 0;
  compare.forEach((value, index) => {
    if (value[index] !== value) {
      distance += 1;
    }
  });
  return distance;
};

/*
  Returns 0 when an array contains any zero
*/
const isZero = (array) => {
  const zero = array.find((value) => {
    if (value === 0) {
      return true;
    }
  });
  return (zero === 0) ? true : false;
};

/*
  A simple utility to show information under an structure
*/
const results = (simulation, result, iterations, time, options) => {
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
  console.log(`${iterations} iterations`);
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
    console.log(`Find extra log information on ./logs/${options.id}.json`);
  }
  console.groupEnd('Extra');

  console.groupEnd('----------------Simulation result----------------');
};


export {
  round,
  random,
  isZero,
  results,
  getIndexes,
  getGreatest,
  fillUpToZero,
  getCurrentPath,
  hammingDistance,
};
