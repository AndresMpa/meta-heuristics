import { getProcessData } from './process.js';

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

const geneticResults = (
  simulation,
  result,
  iterations,
  time,
  epoch,
  options
) => {
  console.group('----------------Simulation results----------------');
  console.log(result);
  console.groupEnd('----------------Simulation result----------------');
};

const geneticInteration = (iterations) => {
  // Objects to cast
  function Status(factible, volume, cost) {
    this.Factible = factible;
    this.Volume = volume;
    this.Cost = cost;
  }

  function Summary(factibles, volumes, costs) {
    function factibleCounter(array) {
      return array.reduce((prev, curr) => (prev += !curr ? 1 : 0), 0);
    }

    function countTotal(array) {
      return array.reduce((prev, curr) => (prev += curr), 0);
    }

    this.totalUnfactible = factibleCounter(factibles);
    this.totalFactible = Math.abs(
      factibles.length - factibleCounter(factibles)
    );

    this.totalVolume = countTotal(volumes);
    this.totalCost = countTotal(costs);
    this.populationMean = this.totalCost / costs.length
  }

  const generation = iterations.length - 1;
  const current = iterations[generation][1];
  let status = {};

  console.group(
    `----------------Iteration ${generation} status----------------\n`
  );
  current['schema'][generation].forEach((_, single) => {
    console.group(
      `\n----------------Single ${single + 1} status----------------\n`
    );
    console.log('Chromosomes: \n');
    console.log(current['schema'][generation][single]);

    status.Status = new Status(
      current['factible'][single],
      current['volume'][single],
      current['cost'][single]
    );

    console.table(status);
    console.groupEnd(
      `\n----------------Single ${single + 1} status----------------\n`
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

  console.group(
    `\n---------------------------Iteration ${generation} summary---------------------------\n`
  );

  console.table(status);

  console.groupEnd(
    `\n---------------------------Iteration ${generation} summary---------------------------\n`
  );
};

export { pathResults, geneticResults, geneticInteration };
