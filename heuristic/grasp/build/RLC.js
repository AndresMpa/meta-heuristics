/*
  Reduced List of Candidates (RLC)
*/

// Utilities
import {
  random,
  roulette,
  dotProduct,
  getIndexes,
  cumulativeList,
} from '../../../util/helpers.js';
import { graspRLC } from '../../../util/information.js';
import { getProcessData } from '../../../util/process.js';

/*
  Adjust cumulative probability to fit with static selection process
*/
const probabilityToBeSelected = (probability) => {
  const total = probability.reduce((prev, curr) => (prev += curr), 0);
  return probability.map((candidateValue) => candidateValue / total);
};

/*
  Calculated based on a random bias candidates probability to be selected
*/
const candidateProbability = (data, simulation, rlc) => {
  const avalibleMethods = ['eq', 'ln', 'po', 'lo', 'ga'];
  const avalibleBias = Object.keys(data);

  let method = avalibleMethods[random(0, avalibleMethods.length)];
  let bias = avalibleBias[random(0, avalibleBias.length)];
  let table = [];

  /*
    RLC have to be sorted under bias criterion
  */
  rlc.sort(
    (pev, next) =>
      dotProduct(next.schema, data[bias]) - dotProduct(pev.schema, data[bias])
  );

  const extendedRLC = rlc.map((candidate) =>
    dotProduct(candidate.schema, data[bias])
  );

  switch (method) {
    /*
      Probability expressed as:
        1 / (number of candidates)
    */
    case 'eq': {
      simulation['methods'].push(`equivalent-probability-bias-${bias}`);
      return extendedRLC.map((_) => 1 / extendedRLC.length);
      break;
    }
    /*
      Probability expressed as:
        1 / (candidate position)
    */
    case 'ln': {
      simulation['methods'].push(`linear-probability-bias-${bias}`);
      return extendedRLC.map((_, index) => 1 / (index + 1));
      break;
    }
    /*
      Probability expressed as:
        1 / pow(candidate value)
    */
    case 'po': {
      simulation['methods'].push(`polynomial-probability-bias-${bias}`);
      return extendedRLC.map((candidate) => 1 / Math.pow(candidate, candidate));
      break;
    }
    /*
      Probability expressed as:
        1 / LN((candidates value) + 1)
    */
    case 'lo': {
      simulation['methods'].push(`logarithmic-probability-bias-${bias}`);
      return extendedRLC.map((candidate) => 1 / (Math.log(candidate) + 1));
      break;
    }
    /*
      Probability expressed as:
        (e ^ - (number of candidates)) / (Total of candidates)
    */
    case 'ga': {
      simulation['methods'].push(`Gaussian-probability-bias-${bias}`);
      return extendedRLC.map(
        (candidate) => 1 / Math.pow(Math.E, -candidate) / extendedRLC.length
      );
      break;
    }
  }
};

/*
  Return a RLC
*/
const getCandidates = (data, simulation) => {
  const limit = random(2, getProcessData().SOLUTION_SIZE);
  const candidates = [];

  // Handle candidates
  let possibleCandidate = {
    schema: structuredClone(simulation.schema),
    feasible: false,
    index: 0,
  };

  // Generate list of candidates
  while (candidates.length < limit) {
    possibleCandidate.index = random(0, simulation['schema'].length);

    possibleCandidate.schema[possibleCandidate.index] =
      possibleCandidate.schema[possibleCandidate.index] === 1 ? 0 : 1;

    possibleCandidate.feasible =
      dotProduct(possibleCandidate.schema, data.volume) <
      simulation.limitVolume;

    if (
      getIndexes(
        candidates.map((possible) => possible.index),
        [possibleCandidate.index]
      ).length === 0
    ) {
      candidates.push(structuredClone(possibleCandidate));
    }
    possibleCandidate.schema = structuredClone(simulation.schema);
  }

  return candidates;
};

const buildRLC = (data, simulation) => {
  const rlc = getCandidates(data, structuredClone(simulation));
  const rlcProbability = candidateProbability(data, simulation, rlc);
  let nextBanachBall;

  if (rlcProbability.every((current, _, data) => current === data[0])) {
    nextBanachBall = random(0, rlcProbability.length);
  } else {
    nextBanachBall = roulette(
      cumulativeList(probabilityToBeSelected(rlcProbability))
    );
  }

  if (parseInt(getProcessData().LOGGER) >= 2) {
    graspRLC(rlc, cumulativeList(probabilityToBeSelected(rlcProbability)));
  }

  return [rlc, rlcProbability, rlc[nextBanachBall]];
};

export { buildRLC };
