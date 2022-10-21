import { getProcessData } from './util/process.js';
import { simulate } from './heuristic/index.js';

const simulationProcess = Object.values(simulate())[0];
let epochs = 1;
let epochData;

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

while (epochs <= getProcessData().EPOCHS) {
  console.log(
    `\n
    ---------------------------------------------------\n
    \t\t\tRunning epoch ${epochs}\n
    ---------------------------------------------------\n
    `
  );
  epochData = initSimulationData();
  simulationProcess(epochData[0], epochData[1]);
  epochs += 1;
}
