const handleGeneratedPopulation = (data, simulation, indexes) => {
  let maxCost = Math.max(...simulation['cost']);
  let index = simulation['cost'].indexOf(maxCost);

  if (simulation['factible'][index]) {
    indexes.push(index);
  }
  simulation['cost'].splice(index, 1);

  if (indexes.length > 2) {
    return indexes;
  }

  return handleGeneratedPopulation(data, simulation, indexes);
};

const updateGreatest = (greatest, simulation) => {
  //console.log(greatest);
  //console.log(simulation);
    greatest.forEach((individual) => {
        //simulation[]
    })
};

export { handleGeneratedPopulation, updateGreatest };
