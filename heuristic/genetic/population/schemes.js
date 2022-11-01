import { getMean, random } from '../../../util/helpers.js';
import { getProcessData } from '../../../util/process.js';

const getOrder = (schema, genotype) => genotype.length - schema.length;

const getLength = (schema) => schema[schema.length - 1][1] - schema[0][1];

const getFitness = (population, schema) =>
  getMean(schema) / getMean(population);

const schemaCutter = (schema, position) => {
  let shortenedSchema = [];
  let index;
  for (index = 0; index < position.length; index++) {
    if (
      position[index + 1] - position[index] <
      getProcessData().SCHEMES_DISTANCE
    ) {
      shortenedSchema.push([schema[index], schema[index + 1]]);
    }
  }

  if (shortenedSchema.length === 0) {
    return [schema[random(0, schema.length)]];
  }
  shortenedSchema.push([shortenedSchema[shortenedSchema.length - 1][1], 0]);
  return shortenedSchema.map((item) => item[0]);
};

const purifySchema = (populationData, schema) => {
  const position = schema.map((allele) => allele[1]);
  const cost = position.map((allele) => populationData['cost'][allele]);
  let shortenedSchema = [];
  /*
    Nothing to do if there's only one
  */
  if (schema.length === 1) {
    shortenedSchema = schema;
  }

  /*
    Identify if they are near, if they
    are not just choose the best one
  */
  if (schema.length === 2) {
    if (position[1] - position[0] > getProcessData().SCHEMES_DISTANCE) {
      if (cost[1] > cost[0]) {
        shortenedSchema = [schema[1]];
      } else {
        shortenedSchema = [schema[0]];
      }
    } else {
      shortenedSchema = schema;
    }
  }

  if (schema.length > 2) {
    shortenedSchema = schemaCutter(schema, position);
  }

  return shortenedSchema;
};

const identifySchema = (data, individuals, greatest) => {
  const bestIndividuals = greatest.map((item) => individuals[item]);
  const chromosomes = [];
  let mean = getMean(Array.from(new Set(data['cost'])));
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

  if (chromosomes.length === 0) {
    mean = getMean(Array.from(new Set(data['volume'])));
    for (column = 0; column < bestIndividuals[0].length; column++) {
      row = 0;

      if (
        bestIndividuals[row][column] === bestIndividuals[row + 1][column] &&
        bestIndividuals[row][column] === 0
      ) {
        for (row = 0; row < bestIndividuals.length; row++) {
          pivot.push(bestIndividuals[row][column]);
        }

        if (
          pivot.every((chromosome) => chromosome === pivot[0]) &&
          data['volume'][column] < mean
        ) {
          chromosomes.push([pivot, column]);
        }
        pivot = [];
        row++;
      }
    }
  }

  return chromosomes;
};

export { getOrder, getLength, getFitness, purifySchema, identifySchema };
