import { getMeanAsSet } from '../../../util/helpers.js';

const getOrder = (schema) => {
  //console.log(order);

  return 0;
};

const getLength = (schema) => {
  //console.log(schema);

  return 0;
};

const getFitness = () => {
  return 0;
};

const identifySchema = (data, individuals, greatest) => {
  const bestIndividuals = greatest.map((item) => individuals[item]);
  const mean = getMeanAsSet(data, 'cost');
  const chromosomes = [];
  let row, column;
  let pivot = [];

  bestIndividuals.forEach((item) => {
    console.log(...item);
  });

  for (column = 0; column < bestIndividuals[0].length; column++) {
    row = 0;

    if (
      bestIndividuals[row][column] === bestIndividuals[row + 1][column] &&
      bestIndividuals[row][column] === 1
    ) {
      for (row = 0; row < bestIndividuals.length; row++) {
        pivot.push(bestIndividuals[row][column]);
      }

      if (
        pivot.every((chromosome) => chromosome === pivot[0]) &&
        data['cost'][column] > mean
      ) {
        chromosomes.push(pivot, column);
      }
      pivot = [];
      row++;
    }
  }

  return chromosomes;
};

export { getOrder, getLength, getFitness, identifySchema };
