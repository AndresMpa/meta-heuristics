import { getProcessData } from './process.js';

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
  Update volume for simulation
*/
const updateVolume = (data, simulation) => {
  const totalVolume = data['volume'].reduce((current, counter) => {
    return current + counter;
  }, 0);

  simulation['limitVolume'] = round(totalVolume * getProcessData().BACKPACK);
};

/*
  Hamming distance between 2 arrays, then return
  distance as a number
*/
const hammingDistance = (data, compare, getPosition = false) => {
  let distance = [0, []];
  compare.forEach((value, index) => {
    if (data[index] !== value) {
      distance[0] += 1;
      distance[1].push(index);
    }
  });
  return getPosition ? distance : distance[0];
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
  return zero === 0 ? true : false;
};

/*
  Calculate the dot product between values from data
*/
const dotProduct = (schema, data) => {
  const total = schema.reduce((previous, current, index) => {
    return (previous += current * data[index]);
  }, 0);
  return total;
};

/*
  Return mean of an array of numbers
*/
const getMean = (data) =>
  data.reduce((prev, curr) => (prev += curr), 0) / data.length;

/*
  Reduce array dimension
*/
const flatter = (array) => array.flat(array.length);

/*
  Return a list of accumulated list
*/
const cumulativeList = (data, accumulated = 0) =>
  data.map((current) => (accumulated += current));

/*
  Using previous calculated probabilities, it choose an item
*/
const roulette = (probability) => {
  const rouletteBall = random(0, 1000) / 1000;
  const winner = probability.find((possible) => rouletteBall - possible < 0);

  return probability.indexOf(winner);
};

export {
  round,
  random,
  isZero,
  flatter,
  getMean,
  roulette,
  dotProduct,
  getIndexes,
  getGreatest,
  updateVolume,
  fillUpToZero,
  cumulativeList,
  getCurrentPath,
  hammingDistance,
};
