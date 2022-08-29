import { simulate } from './simulation/simulator.js';

let iterations = [];
let simulation = {
  factible: true,
  methods: [],
  schema: [],

  limitVolume: 0,
  volume: 0,
  cost: 0,
};

simulate(simulation, iterations);
