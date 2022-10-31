import { getProcessData } from '../../../util/process.js';
import { round } from '../../../util/helpers.js';
import {
  getOrder,
  getLength,
  getFitness,
  purifySchema,
  identifySchema,
} from './schemes.js';

const identifyGreatestIndividuals = (population, indexes) => {
  let maxCost = Math.max(...population['cost']);
  let index = population['cost'].indexOf(maxCost);

  if (population['factible'][index] && indexes.indexOf(index) === -1) {
    indexes.push(index);
  }
  population['cost'][index] = 0;

  if (indexes.length > getProcessData().RELEVANT) {
    return indexes;
  }

  return identifyGreatestIndividuals(population, indexes);
};

const getGreatestIndividuals = (populationData, population) => {
  const greatest = identifyGreatestIndividuals(structuredClone(population), []);

  const bestIndividuals = greatest.map((individual) => {
    return {
      factible: population['factible'][individual],
      schema: population['schema'][population['schema'].length - 1][individual],
      limitVolume: population['limitVolume'],
      volume: population['volume'][individual],
      cost: population['cost'][individual],
      individual: individual,
    };
  });

  return bestIndividuals;
};

const schemaSimplifier = (schema) => {
  let simplifiedSchema = [schema[0][1], schema[schema.length - 1][1]];
  if (simplifiedSchema[0] === simplifiedSchema[simplifiedSchema.length - 1]) {
    simplifiedSchema.pop();
  }

  return simplifiedSchema;
};

const calculateGreatestCharacteristics = (
  populationData,
  population,
  bestIndividuals
) => {
  const greatest = identifyGreatestIndividuals(structuredClone(population), []);
  const schemaCost = bestIndividuals.map((individual) => individual['cost']);
  let schema = identifySchema(
    populationData,
    population['schema'][population['schema'].length - 1],
    greatest
  );

  schema = purifySchema(populationData, schema);

  bestIndividuals.forEach((_, individual) => {
    bestIndividuals[individual] = {
      ...bestIndividuals[individual],
      order: round(getOrder(schema, bestIndividuals[individual]['schema'])),
      length: getLength(schema),
      fitness: round(getFitness(population['cost'], schemaCost)),
      schemaDefinition: schemaSimplifier(schema),
    };
  });
};

export {
  getGreatestIndividuals,
  identifyGreatestIndividuals,
  calculateGreatestCharacteristics,
};
