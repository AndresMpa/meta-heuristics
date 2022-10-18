/*
  It gives package.json commands some
  important utilities to handle with the
  project
*/

const cliHandler = () => {
  const options = {
    keep: false,
    schema: 0,
  };
  const argvs = process.argv;
  if (argvs.length > 4) {
    throw new Error('Unknow actions');
  }

  if (argvs[2] == 'k') {
    options['keep'] = true;
    options['id'] = Date.now()
  }

  if (argvs[3]) {
    let regrex = /[c|v|o|k]/g;
    if (regrex.test(argvs.slice(3))) {
      options['schema'] = argvs.slice(3);
    }
  }

  return options;
};

/*
  Utility for big screen used to display data in a
  pretty way
*/
const logsForBigScreens = (data) => {
  console.table({
    Cost: data['cost'],
  });
  console.table({
    Volume: data['volume'],
  });
  console.table({
    CostVolume: data['costVolume'],
  });
  console.table({
    kFactor: data['kFactor'],
  });
};

export { cliHandler, logsForBigScreens };
