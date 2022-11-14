import { feasibility } from '../../../generators/population/handler.js';
import { random, dotProduct } from '../../../util/helpers.js';
import { getProcessData } from '../../../util/process.js';

const mutate = (population) => {
  const mutated = [];
  let mutations = 0;
  let index;

  while (mutations < getProcessData().MUTATION_RATE) {
    index = [
      random(0, population['schema'][0].length),
      random(0, population['schema'][0][0].length),
    ];
    population['schema'][0][index[0]][index[1]] =
      population['schema'][0][index[0]][index[1]] === 1 ? 0 : 1;
    mutated.push(index[0]);
    mutations++;
  }
  return mutated;
};

const updatePopulation = (populationData, population, mutated) => {
  let individual;
  mutated.forEach((index) => {
    individual = population['schema'][0][index];

    population['factible'][index] = feasibility(
      population['limitVolume'],
      dotProduct(individual, populationData['volume'])
    );
    population['volume'][index] = dotProduct(
      individual,
      populationData['volume']
    );
    population['cost'][index] = dotProduct(individual, populationData['cost']);
  });
};

const generateMutation = (data, population, options) => {
  let mutated = mutate(population);
  updatePopulation(data, population, mutated);
};

export { generateMutation };
