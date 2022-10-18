import { random, getCurrentPath } from '../util/helpers.js';
import fs from 'fs';

/*
  Get data from a sample to load data into RAM
*/
const getSample = (lastSample = true) => {
  const path = getCurrentPath('dataHandlers', 'samples');
  const samples = fs.readdirSync(path);
  const samplesPath = samples.map((sample) => {
    return `${path}/${sample}`;
  }, 0);

  const rawData = fs.readFileSync(
    samplesPath[lastSample ? 0 : random(0, samplesPath.length)],
    {
      encoding: 'utf8',
      flag: 'r',
    },
    (error, data) => {
      if (error) {
        console.error(error);
        throw new Error('Error reading sample data');
      }
      return data;
    }
  );
  return JSON.parse(rawData);
};

export { getSample };
