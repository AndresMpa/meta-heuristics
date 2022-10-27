import { getProcessData } from './../util/process.js';
import { dotProduct, random } from './../util/helpers.js';

const feasibility = (limit, value) => (limit - value > 0 ? true : false);

const checkFeasibility = (infeasibleLimit, storage, data, dna) => {
  console.log(storage['limitVolume'], dotProduct(dna, data['volume']));
  console.log(feasibility(storage['limitVolume'], dotProduct(dna, data['volume'])));

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
  storage['schema'].forEach((single, singleIndex) => {
    single.forEach((dna, dnaIndex) => {
      dna = genChromosomes(dna);
      while (checkFeasibility(infeasibleLimit, storage, data, dna)) {
        dna = genChromosomes(dna);
      }
      storage['schema'][singleIndex][dnaIndex] = dna;
      infeasibleLimit++;
    });
  });
};

const fixSingle = (population, generation, single) => {
  population['schema'][generation][single] = genChromosomes(
    population['schema'][generation][single]
  );
};

export { populate, fixSingle };
