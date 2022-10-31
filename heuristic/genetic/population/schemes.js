import { getProcessData } from '../../../util/process.js';
import { getMean } from '../../../util/helpers.js';

const getOrder = (schema, genotype) => genotype.length - schema.length;

const getLength = (schema) => {
  try {
    schema[schema.length - 1][1] - schema[0][1];
  } catch (error) {
    console.log(schema);
    console.log('Error: getLength');
  }
};

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
    console.log("There's no a near alleles");
    return schema[random(0, schema.length)];
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
        shortenedSchema = schema[1];
      } else {
        shortenedSchema = schema[0];
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

export { getOrder, getLength, getFitness, purifySchema, identifySchema };
