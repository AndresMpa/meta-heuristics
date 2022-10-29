import { getProcessData } from '../../../util/process.js';

const identifyGreatestIndividuals = (simulation, indexes) => {
  let maxCost = Math.max(...simulation['cost']);
  let index = simulation['cost'].indexOf(maxCost);

  if (simulation['factible'][index] && indexes.indexOf(index) === -1) {
    indexes.push(index);
  }
  simulation['cost'][index] = 0;

  if (indexes.length > getProcessData().RELEVANT) {
    return indexes;
  }

  return identifyGreatestIndividuals(simulation, indexes);
};

const getGreatestIndividuals = (data, simulation) => {
  const greatest = identifyGreatestIndividuals(structuredClone(simulation), []);

  const bestIndividuals = greatest.map((individual) => {
    return {
      factible: simulation['factible'][individual],
      schema: simulation['schema'][simulation['schema'].length - 1][individual],
      limitVolume: simulation['limitVolume'],
      volume: simulation['volume'][individual],
      cost: simulation['cost'][individual],
    };
  });

  return bestIndividuals;
};

const calculateGreatestCharacteristics = (
  data,
  simulation,
  bestIndividuals
) => {
  const populationCostMean =
    simulation['cost'].reduce((prev, curr) => (prev += curr)) /
    simulation['cost'].length;
  const schema = identifySchema(
    data,
    simulation['schema'][simulation['schema'].length - 1],
    greatest
  );

  bestIndividuals.forEach((individual) => {
    individual = {
      ...individual,
      order: getOrder(schema),
      length: getLength(schema),
      fitness: getFitness(populationCostMean),
    };
  });
};

export {
  getGreatestIndividuals,
  identifyGreatestIndividuals,
  calculateGreatestCharacteristics,
};
