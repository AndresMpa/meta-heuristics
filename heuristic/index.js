import { getProcessData } from '../util/process.js';

import geneticSimulation from './genetic/index.js';
import graspSimulation from './grasp/index.js';
import pathSimulation from './path/index.js';

const simulate = () => {
  switch (getProcessData().HEURISTIC) {
    case 'path': {
      return pathSimulation;
      break;
    }
    case 'grasp': {
      return pathSimulation;
      break;
    }
    case 'genetic': {
      if (getProcessData().SOLUTION_SIZE < 10) {
        console.error(
          'Solution size is too small to get significant results using genetic approach, try another heuristic'
        );
      }
      return geneticSimulation;
      break;
    }
    default: {
      console.error(
        'Something went wrong, using default path & neighborhood simulation'
      );
      return pathSimulation;
      break;
    }
  }
};

// Truncate function injection
export { simulate };
