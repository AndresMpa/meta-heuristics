import { identifySchema, getOrder, getLength, getFitness } from './schemes.js';
import { getProcessData } from '../../../util/process.js';
import { round } from '../../../util/helpers.js';

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

const calculateGreatestCharacteristics = (
  populationData,
  population,
  bestIndividuals
) => {
  const greatest = identifyGreatestIndividuals(structuredClone(population), []);
  const schemaCost = bestIndividuals.map((individual) => individual['cost']);
  const schema = identifySchema(
    populationData,
    population['schema'][population['schema'].length - 1],
    greatest
  );

  bestIndividuals.forEach((_, individual) => {
    bestIndividuals[individual] = {
      ...bestIndividuals[individual],
      order: round(getOrder(schema, bestIndividuals[individual]['schema'])),
      length: getLength(schema),
      fitness: round(getFitness(population['cost'], schemaCost)),
    };
  });
};

export {
  getGreatestIndividuals,
  identifyGreatestIndividuals,
  calculateGreatestCharacteristics,
};
