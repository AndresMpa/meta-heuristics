import { getProcessData } from './util/process.js';
import { simulate } from './heuristic/index.js';
import { cliHandler } from './cli/handler.js';

const simulationProcess = Object.values(simulate())[0];
const cliOptions = cliHandler();
let epochs = 1;
let epochData;

const initSimulationData = () => {
  let iterations = [];
  let simulation = {
    factible: [true],
    methods: [],
    schema: [],

    limitVolume: 0,
    volume: [0],
    cost: [0],
  };
  return [simulation, iterations];
};

while (epochs <= getProcessData().EPOCHS) {
  if (getProcessData().LOGGER === '1') {
    console.log(
      `\n
    ---------------------------------------------------\n
    \t\t\tRunning epoch ${epochs}\n
    ---------------------------------------------------\n
    `
    );
  }
  epochData = initSimulationData();
  simulationProcess(epochData[0], epochData[1], epochs, cliOptions);
  epochs += 1;
}
