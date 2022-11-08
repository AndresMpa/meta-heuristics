/*
  Let simulation run when I meet the constrains
*/
const running = (simulation) => false;

const graspSimulation = (simulation, iterations) => {
  const timeStart = performance.now();
  const data = getInitialSchema(simulation, options);

  if (getProcessData().LOGGER === '1') {
    console.log(`Iteration ${simulation['methods'].length - 1}: Schema`);
    console.log(simulation);
  }

  iterations.push(structuredClone([data, simulation]));

  while (running(simulation)) {
    if (getProcessData().LOGGER === '1') {
      console.log(`Iteration ${iterations.length}: `);
      console.log('State of data:');
      console.log(data);
    }
  }
  // GRASP end here

  if (getProcessData().LOGGER === '1') {
    console.log('\n---------------Simulation terminated--------------\n');
  }

  const timeEnd = performance.now();

  if (getProcessData().LOGGER === '1') {
    graspResults(
      simulation,
      iterations[iterations.length - 2],
      iterations.length,
      timeEnd - timeStart,
      epoch,
      options
    );
  }
  if (options.keep) {
    makeFile(
      JSON.stringify(iterations),
      epoch,
      options.id,
      'json',
      'logs/',
      '.'
    );
  }
};


export default { graspSimulation };
