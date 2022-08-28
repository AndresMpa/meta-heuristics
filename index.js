const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const fillUpToZero = (data) => {
  cost.forEach((_) => {
    data.push(0);
  });
};

const cost = [9.0, 5.0, 12.0, 6.0, 4.0, 10.0, 5.0, 14.0, 3.0, 8.0];
const volume = [10.0, 6.0, 8.0, 4.0, 9.0, 4.0, 10.0, 3.0, 7.0, 8.0];
const costOverVolume = [0.9, 0.83, 1.5, 1.5, 0.44, 2.5, 0.5, 4.67, 0.43, 1.0];
const k_factor = [9.2, 5.2, 11.2, 5.6, 5.0, 8.8, 6.0, 11.8, 3.8, 8.0];

let schema = [];

const simulate = () => {
  fillUpToZero(schema)
  schema[random(0, cost.length)] = 1;
  console.log(schema);
};

simulate()
