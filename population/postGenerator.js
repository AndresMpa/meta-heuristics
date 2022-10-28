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

const identifySchema = (data, individuals, greatest) => {
  const bestIndividuals = greatest.map((item) => {
    return individuals[item];
  });

  const values = new Set(data['cost']);
  let mean = 0;
  values.forEach((item) => {
    mean += item;
  });

  mean /= values.size;

  console.log(mean);
  console.log(...data['cost']);
  console.log();

  console.log(Math.max(...data['cost']));
  console.log(Math.min(...data['cost']));

  let schema = [];
  let index;

  for (index = 0; index < bestIndividuals.length; index++) {
    console.log(...bestIndividuals[index]);
  }
  console.log(schema);

  return schema;
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
