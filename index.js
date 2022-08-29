import { simulate } from './simulation/simulator.js';

let epochs = 1;

const initSimulationData = () => {
  let iterations = [];
  let simulation = {
    factible: true,
    methods: [],
    schema: [],

    limitVolume: 0,
    volume: 0,
    cost: 0,
  };
  return [simulation, iterations];
};

while (epochs <= 4) {
  console.log(
    `\n
    ---------------------------------------------------\n
    \t\t\tRunning epoch ${epochs}\n
    ---------------------------------------------------\n
    `
  );
  let epochData = initSimulationData();
  simulate(epochData[0], epochData[1]);
  epochs += 1;
}
