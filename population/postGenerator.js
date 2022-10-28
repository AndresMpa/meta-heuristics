import { getProcessData } from '../util/process.js';

const handleGeneratedPopulation = (simulation, indexes) => {
  let maxCost = Math.max(...simulation['cost']);
  let index = simulation['cost'].indexOf(maxCost);

  if (simulation['factible'][index] && indexes.indexOf(index) === -1) {
    indexes.push(index);
  }
  simulation['cost'][index] = 0;

  if (indexes.length > getProcessData().RELEVANT) {
    return indexes;
  }

  return handleGeneratedPopulation(simulation, indexes);
};

const getGreatestIndividuals = (greatest, simulation) => {
  const best = greatest.map((individual) => {
    return {
      factible: simulation['factible'][individual],
      schema: simulation['schema'][simulation['schema'].length - 1][individual],
      limitVolume: simulation['limitVolume'],
      volume: simulation['volume'][individual],
      cost: simulation['cost'][individual],
    };
  });
};

export { handleGeneratedPopulation, getGreatestIndividuals };
