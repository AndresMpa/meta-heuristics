import { getProcessData } from './process.js';
import { getMean } from './helpers.js';

/*
  A simple utility to show information under an structure
*/
const pathResults = (simulation, result, iterations, time, epoch, options) => {
  if (result[1]) {
    result = result[1];
  }

  console.group('----------------Simulation results----------------');
  console.group('Results:');
  console.group(`Simulation:`);
  console.log(`Simulation got a max cost of: ${result.cost}`);
  console.log(`Simulation got a min volume of: ${result.volume[0]}`);
  console.log(`Simulation fill up limit volume of: ${result.limitVolume}`);
  console.log(`Simulation used methods:`);
  console.log(result.methods);
  console.log('Simulation got schema:');
  console.log(result.schema);
  console.groupEnd('Simulation got:');
  console.groupEnd('Results:');

  console.group('Performance');
  console.group(`Simulation took:`);
  console.log(`${time} miliseconds`);
  console.log(`${iterations} iterations`);
  console.groupEnd('Simulation took:');
  console.groupEnd('Performance');

  console.group('Extras');
  console.log(
    `Simulation terminated due to factiblility: ${simulation.factible[0]}`
  );

  console.group(`Last neighbour:`);
  console.log(`Neighbour suggested a cost of: ${simulation.cost[0]}`);
  console.log(`Neighbour suggested a volume of: ${simulation.volume[0]}`);
  console.log(
    `Neighbour used method: ${
      simulation.methods[simulation.methods.length - 1]
    }`
  );
  console.log('Neighbour suggested schema:');
  console.log(simulation.schema);
  console.groupEnd('Last neighbour:');

  if (options.keep) {
    console.log(
      `Find extra log information on ./logs/${options.id}_for_"${
        getProcessData().HEURISTIC
      }"_running_epoch_${epoch}_of_${getProcessData().EPOCHS}.json`
    );
  }
  console.groupEnd('Extra');

  console.groupEnd('----------------Simulation result----------------');
};

const graspResults = () => {};

const graspIteration = () => {};

const geneticResults = (simulation, iterations, time, epoch, options) => {
  console.group('----------------Simulation results----------------');
  console.group('Simulation:');
  console.group(`Last population data:`);
  console.log(`Population got a cost schema of:`);
  console.log(...simulation.cost);
  console.log(`Population got a volume schema of:`);
  console.log(...simulation.volume);
  console.log(`Simulation calculate a limit volume of:`);
  console.log(simulation.limitVolume);
  console.log(`Simulation selected individuals for breeding using:`);
  console.log(simulation.methods);
  console.log('Last population got genotypes:');
  simulation.schema[0].forEach((individual) => console.log(...individual));
  console.groupEnd('Last population data:');
  console.groupEnd('Simulation:');

  console.group('Performance');
  console.group(`Simulation took:`);
  console.log(`${time} miliseconds`);
  console.log(`${iterations.length} iterations`);
  console.groupEnd('Simulation took:');
  console.groupEnd('Performance');

  console.group('Extras');
  console.log(
    `Simulation met epochs limit at ${epoch}/${getProcessData().EPOCHS}`
  );
  console.log(`Fitness mean through generations:`);
  console.log(
    getMean(iterations.map((generation) => generation[2][0]['fitness']))
  );
  console.log(`Mutation probability:`);
  console.log(
    getProcessData().MUTATION_RATE /
      (simulation['schema'][0].length * simulation['schema'][0][0].length)
  );

  console.log(`Mutation rate:`);
  console.log(getProcessData().MUTATION_RATE * 1);

  if (options.keep) {
    console.log(
      `Find extra log information on ./logs/${options.id}_for_"${
        getProcessData().HEURISTIC
      }"_running_epoch_${epoch}_of_${getProcessData().EPOCHS}.json`
    );
  }
  console.groupEnd('Extra');
  console.groupEnd('----------------Simulation result----------------');
};

const geneticInteration = (iterations) => {
  // Objects to cast
  function Status(factible, volume, cost) {
    this.Factible = factible;
    this.Volume = volume;
    this.Cost = cost;
  }

  function Best(order, length, fitness) {
    this.Order = order;
    this.length = length;
    this.fitness = fitness;
  }

  function Summary(factibles, volumes, costs) {
    function factibleCounter(array) {
      return array.reduce((prev, curr) => (prev += !curr ? 1 : 0), 0);
    }

    function countTotal(array) {
      return array.reduce((prev, curr) => (prev += curr), 0);
    }

    this.totalUnfeasible = factibleCounter(factibles);
    this.totalFeasible = Math.abs(
      factibles.length - factibleCounter(factibles)
    );

    this.totalVolume = countTotal(volumes);
    this.totalCost = countTotal(costs);
    this.populationMean = this.totalCost / costs.length;
  }

  const generation = iterations.length - 1;
  const current = iterations[generation][1];
  const schema = [];
  let status = {};

  console.group(
    `----------------Iteration ${generation} status----------------\n`
  );
  current['schema'][0].forEach((_, individual) => {
    console.group(
      `\n----------------Individual ${individual + 1} status----------------\n`
    );
    console.log('Chromosomes: \n');
    console.log(current['schema'][0][individual]);

    status.Status = new Status(
      current['factible'][individual],
      current['volume'][individual],
      current['cost'][individual]
    );

    console.table(status);
    console.groupEnd(
      `\n----------------Individual ${individual + 1} status----------------\n`
    );
  });

  console.groupEnd(
    `----------------Iteration ${generation} status----------------\n`
  );

  status.Status = new Summary(
    current['factible'],
    current['volume'],
    current['cost']
  );

  // Summary
  console.group(
    `\n-----------------------------------Iteration ${generation} summary-----------------------------------\n`
  );
  console.table(status);
  console.groupEnd(
    `\n-----------------------------------Iteration ${generation} summary-----------------------------------\n`
  );

  // Best individuals
  console.group(
    `\n----------------Best individuals from generation ${generation}----------------\n`
  );
  iterations[generation][2].forEach((individual) => {
    console.group(
      `\n----------------Individual ${
        individual['individual'] + 1
      } status----------------\n`
    );
    console.log('Chromosomes: \n');
    console.log(individual['schema']);
    schema.push([individual['schema'], individual['individual']]);

    status.Status = new Status(
      individual['factible'],
      individual['volume'],
      individual['cost']
    );
    console.table(status);
    status = {};

    status.Best = new Best(
      individual['order'],
      individual['length'],
      individual['fitness']
    );
    console.table(status);
    status = {};

    console.groupEnd(
      `\n----------------Individual ${
        individual['individual'] + 1
      } status----------------\n`
    );
  });

  console.group(
    `\n----------------Best individuals genotype from generation ${generation}----------------\n`
  );
  schema.forEach((genotype) => {
    console.log(`Individual ${genotype[1]} genotype`);
    console.log(...genotype[0]);
  });
  console.groupEnd(
    `\n----------------Best individuals genotype from generation ${generation}----------------\n`
  );

  console.groupEnd(
    `\n----------------Best individuals from generation ${generation}----------------\n`
  );
};

export {
  pathResults,
  graspResults,
  graspIteration,
  geneticResults,
  geneticInteration,
};
