import { hammingDistance } from '../util/helpers.js';
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

const getPhenotypeMean = (data) => {
  const alleles = new Set(data['cost']);
  let mean = 0;

  alleles.forEach((item) => (mean += item));

  mean /= alleles.size;

  return mean;
};

const identifySchema = (data, individuals, greatest) => {
  const bestIndividuals = greatest.map((item) => individuals[item]);
  const mean = getPhenotypeMean(data);
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
  console.log(chromosomes);

  return chromosomes;
};

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

const getGreatestIndividuals = (data, simulation) => {
  const greatest = identifyGreatestIndividuals(structuredClone(simulation), []);

  const totalCost = simulation['cost'].reduce((prev, curr) => (prev += curr));
  const schema = identifySchema(
    data,
    simulation['schema'][simulation['schema'].length - 1],
    greatest
  );

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
