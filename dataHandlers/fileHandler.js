import { round, random, getCurrentPath } from '../util/helpers.js';
import { getProcessData } from '../util/process.js';
import fs from 'fs';

/*
  It generates a random sample under JSON structure like:

  data = {
    key: []
  }

  By default it generate 60 values per sample
*/
const generateData = (dataLength = 60, top = [20, 60]) => {
  let currentVolume = 0;
  let currentCost = 0;

  const generatedData = {
    costVolume: [],
    kFactor: [],
    volume: [],
    cost: [],
  };

  [...Array(dataLength).keys()].forEach((_) => {
    currentCost = random(1, top[0]);
    currentVolume = random(1, top[1]);

    generatedData['cost'].push(currentCost);
    generatedData['volume'].push(currentVolume);
    generatedData['costVolume'].push(round(currentCost / currentVolume));
    generatedData['kFactor'].push(
      round(currentCost * 0.8 + currentVolume * 0.2)
    );
  });

  return generatedData;
};

/*
  It generate a file to be use as sample with given data
*/
const makeFile = (
  data,
  ext = 'txt',
  targetDir = 'samples',
  basePath = 'dataHandlers',
  identifier = Date.now()
) => {
  const path = getCurrentPath(basePath, targetDir);
  const filePath = `${path}/${identifier}${getProcessData().HEURISTIC}${
    getProcessData().EPOCHS
  }.${ext}`;
  fs.writeFile(filePath, data, (error) => {
    if (error) {
      console.error(error);
      throw new Error('Error generating file');
    }
  });
};

/*
  Generate a sample under an structure
*/
const generateSample = () => {
  try {
    const sampleData = generateData();
    makeFile(JSON.stringify(sampleData));
    console.log('Sample created successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Error creating sample');
  }
};

export { generateSample, makeFile };
