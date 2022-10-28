import { getProcessData } from '../util/process.js';

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

const getOrder = (schema) => {
  return 0;
};

const getLength = (schema) => {
  return 0;
};

const getFitness = () => {
  return 0;
};

const getGreatestIndividuals = (greatest, simulation) => {
  console.log(simulation);
  const best = greatest.map((individual) => {
    return {
      factible: simulation['factible'][individual],
      schema: simulation['schema'][simulation['schema'].length - 1][individual],
      limitVolume: simulation['limitVolume'],
      volume: simulation['volume'][individual],
      cost: simulation['cost'][individual],
      order: getOrder(
        simulation['schema'][simulation['schema'].length - 1][individual]
      ),
      length: getLength(
        simulation['schema'][simulation['schema'].length - 1][individual]
      ),
      fitness: getFitness(),
    };
  });
  return best;
};

export { identifyGreatestIndividuals, getGreatestIndividuals };
