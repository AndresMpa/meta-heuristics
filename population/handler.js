import { getProcessData } from './../util/process.js';
import { dotProduct, random } from './../util/helpers.js';

const feasibility = (limit, value) => (limit - value > 0 ? true : false);

const checkFeasibility = (infeasibleLimit, storage, data, dna) => {
  return (
    infeasibleLimit < getProcessData().INFEASIBLE_LIMIT &&
    feasibility(storage['limitVolume'], dotProduct(dna, data['volume']))
  );
};

const genChromosomes = (dna) => {
  return dna.map((_) => {
    return random(0, 3) === 0 ? 1 : 0;
  });
};

const populate = (data, storage) => {
  let infeasibleLimit = 0;
  storage['factible'] = [];
  storage['schema'].forEach((single, singleIndex) => {
    single.forEach((dna, dnaIndex) => {
      dna = genChromosomes(dna);
      if (infeasibleLimit < getProcessData().INFEASIBLE_LIMIT) {
        while (checkFeasibility(infeasibleLimit, storage, data, dna)) {
          dna = genChromosomes(dna);
        }
      } else {
        while (
          !feasibility(storage['limitVolume'], dotProduct(dna, data['volume']))
        ) {
          dna = genChromosomes(dna);
        }
      }

      storage['factible'].push(
        feasibility(storage['limitVolume'], dotProduct(dna, data['volume']))
      );
      storage['schema'][singleIndex][dnaIndex] = dna;
      infeasibleLimit++;
    });
  });
};

const fixSingle = (population, generation, single, feasible) => {
  let dna;
  if (feasible) {
    while (
      !feasibility(storage['limitVolume'], dotProduct(dna, data['volume']))
    ) {
      dna = genChromosomes(population['schema'][generation][single]);
    }
  } else {
    while (
      feasibility(storage['limitVolume'], dotProduct(dna, data['volume']))
    ) {
      dna = genChromosomes(population['schema'][generation][single]);
    }
  }
  population['schema'][generation][single] = dna;
};

export { populate, fixSingle, feasibility };
