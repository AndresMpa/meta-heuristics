const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const fillUpToZero = (data) => {
  cost.forEach((_) => {
    data.push(0);
  });
};

export default { random, fillUpToZero };
