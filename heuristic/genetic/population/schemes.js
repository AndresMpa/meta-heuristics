import { getMean } from '../../../util/helpers.js';

const getOrder = (schema, genotype) => genotype.length - schema.length;

const getLength = (schema) => schema[schema.length - 1][1] - schema[0][1];

const getFitness = (population, schema) =>
  getMean(schema) / getMean(population);

const identifySchema = (data, individuals, greatest) => {
  const bestIndividuals = greatest.map((item) => individuals[item]);
  const mean = getMean(Array.from(new Set(data['cost'])));
  const chromosomes = [];
  let row, column;
  let pivot = [];

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
        chromosomes.push([pivot, column]);
      }
      pivot = [];
      row++;
    }
  }

  return chromosomes;
};

export { getOrder, getLength, getFitness, identifySchema };
