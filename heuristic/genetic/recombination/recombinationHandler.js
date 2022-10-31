import { feasibility } from '../../../generators/population/handler.js';
import { random, flatter, dotProduct } from '../../../util/helpers.js';
import { getProcessData } from '../../../util/process.js';

/*
  Make couples to create offspring
*/
const getCouple = (parents) => {
  const couples = [];
  let index;

  for (index = 0; index < parents.length - 1; index += 2) {
    couples.push([parents[index], parents[index + 1]]);
  }

  if (parents.length % 2 !== 0) {
    couples.push([parents[parents.length - 1], parents[0]]);
  }

  return couples;
};

/*
  It returns a specific number of points to combine the
  selected parents
*/
const getCombinationPoints = (size, constrains) => {
  let generator = 0;
  const points = [];
  let pivot = [];

  while (pivot.length < getProcessData().COMBINATION_POINTS) {
    generator = random(1, size);
    constrains.forEach((constrain) => {
      while (generator > constrain[0] && generator < constrain[1]) {
        generator = random(1, size);
      }
      pivot.push(generator);
    });
    if (constrains.length === 0) {
      pivot.push(generator);
    }
  }

  pivot.sort();
  generator = 0;
  pivot.forEach((position) => {
    points.push([generator, position]);
    generator = position;
  });

  points.push([generator, size - 1]);
  return points;
};

/*
  Generate an n offspring
*/
const generateOffspring = (couple, combinationPoint) => {
  let offspring = [];
  let pivot = [];

  combinationPoint.forEach((index) => {
    if (pivot.length > 1) {
      pivot[1] = pivot[1].concat(couple[0].slice(index[0], index[1]));
      pivot[0] = pivot[0].concat(couple[1].slice(index[0], index[1]));

      offspring.push(pivot);
      pivot = [];
    } else {
      pivot[0] = couple[0].slice(index[0], index[1] + 1);
      pivot[1] = couple[1].slice(index[0], index[1] + 1);
    }
  });

  return offspring;
};

/*
  Identify if a parent in a couple is a greatest individual
  then create a new individual using schemes if it is necessary
  if it is not, just create a new individual
*/
const combine = (couple, reference, best) => {
  const bestIndexes = best.map((item) => item[0]);
  let constrains = [];

  reference.forEach((index) => {
    if (bestIndexes.includes(index)) {
      constrains.push(best[bestIndexes.indexOf(index)][1]);
    }
  });

  const points = getCombinationPoints(couple[0].length, constrains);

  return generateOffspring(couple, points);
};

const insertOffspring = (populationData, population, offspring) => {
  let index;

  offspring.forEach((individual) => {
    index = random(0, population['factible'].length);

    population['factible'][index] = feasibility(
      population['limitVolume'],
      dotProduct(individual, populationData['volume'])
    );
    population['schema'][0][index] = individual;
    population['volume'][index] = dotProduct(
      individual,
      populationData['volume']
    );
    population['cost'][index] = dotProduct(individual, populationData['cost']);
  });
};

/*
  Handle new population generation, offspring creation,
  offspring insertion and population modification
*/
const recombinateGenotypes = (
  populationData,
  population,
  greatest,
  parents
) => {
  const best = greatest.map((individual) => [
    individual['individual'],
    individual['schemaDefinition'],
  ]);
  const couples = getCouple(parents);
  let offspring = [];
  let pivot = [];

  offspring = couples.map((combination) => {
    return combine(
      [
        population['schema'][0][combination[0]],
        population['schema'][0][combination[1]],
      ],
      combination,
      best
    );
  });

  offspring = flatter(offspring);

  insertOffspring(populationData, population, offspring);
};
export { recombinateGenotypes };
