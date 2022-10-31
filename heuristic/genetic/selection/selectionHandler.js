import { getProcessData } from '../../../util/process.js';
import { random } from '../../../util/helpers.js';

const ranking = (population, target) => {
  let offspring = [];
  const targetSum = population[target].reduce(
    (prev, curr) => (prev += curr),
    0
  );
  population[target].forEach((individual, index) =>
    offspring.push([individual / targetSum, index])
  );

  if (target === 'volume') {
    offspring.sort((prev, curr) => prev[0] - curr[0]);
  } else {
    offspring.sort((prev, curr) => curr[0] - prev[0]);
  }

  offspring = offspring.slice(0, getProcessData().OFFSPRING);

  return offspring.map((item, index) => item[1]);
};

const roulette = (population, target) => {
  let rouletteBall = 0;
  let summatory = 0;
  let offspring = [];
  let pivot = [];
  const targetSum = population[target].reduce(
    (prev, curr) => (prev += curr),
    0
  );
  population[target].forEach((individual, index) =>
    offspring.push([(individual * 100) / targetSum, index])
  );

  offspring.forEach((individual, index) => {
    summatory += individual[0];
    offspring[index][0] = summatory;
  });

  while (pivot.length < getProcessData().OFFSPRING) {
    rouletteBall = random(0, 100);
    pivot.push(
      offspring.find((individual) => rouletteBall - individual[0] < 0)
    );
  }

  return pivot.map((item, index) => item[1]);
};

const randomSelection = (population) => {
  const offspring = [];
  let current = 0;

  while (current < getProcessData().OFFSPRING) {
    offspring.push(random(0, population['schema'][0].length));
    current++;
  }

  return offspring;
};

const selectIndividuals = (data, population) => {
  const methods = ['ranking', 'roulette', 'random'];
  const subFactor = ['cost', 'volume'];
  const nextMethod = random(0, methods.length);
  const indexFactor = random(0, 2);

  population['methods'].push(
    `${methods[nextMethod]}-by-${subFactor[indexFactor]}`
  );

  switch (methods[nextMethod]) {
    case 'ranking': {
      return ranking(population, subFactor[indexFactor]);
      break;
    }
    case 'roulette': {
      return roulette(population, subFactor[indexFactor]);
      break;
    }
    default: {
      population['methods'].pop();
      population['methods'].push('random');
      return randomSelection(population);
      break;
    }
  }
};

export { selectIndividuals };
