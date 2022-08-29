const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const round = (number) => {
  let roundedNumber = Number((Math.abs(number) * 100).toPrecision(15));
  return (Math.round(roundedNumber) / 100) * Math.sign(number);
};

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

export { round, random, fillUpToZero, getGreatest, getIndexes, getCurrentPath };
