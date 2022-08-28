import { random, getCurrentPath } from '../util/helpers.js';
import fs from 'fs';

/*
  It generates a random sample under JSON structure like:

  data = {
    key: []
  }

  By default it generate 60 values per sample
*/
const generateData = (dataLength = 60, top = [40, 80]) => {
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
    generatedData['costVolume'].push(currentCost / currentVolume);
    generatedData['kFactor'].push(currentCost * 0.8 + currentVolume * 0.2);
  });

  return generatedData;
};

/*
  It generate a file to be use as sample with given data
*/
const makeFile = (data) => {
  const path = getCurrentPath('dataHandlers', 'samples');
  const samplePath = `${path}/${Date.now()}.txt`;
  console.log(samplePath);

  fs.writeFile(samplePath, JSON.stringify(data), (error) => {
    if (error) {
      console.error(error);
      throw new Error('Error generating sample file');
    }
  });
};

const generateSample = () => {
  try {
    const sampleData = generateData();
    makeFile(sampleData);
    console.log('Sample created successfully');
  } catch (error) {
    console.error(error);
    throw new Error('Error creating sample');
  }
};

generateSample();
