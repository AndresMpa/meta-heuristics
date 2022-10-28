const handleGeneratedPopulation = (data, simulation)=> {
    console.log(Math.max(...simulation['cost']));
}

export { handleGeneratedPopulation }