const cliHandler = () => {
  const options = {
    keep: false,
    schema: 0,
  };
  const argvs = process.argv;
  if (argvs.length > 4) {
    throw new Error('Unknow actions');
  }

  options['keep'] = argvs.slice(2) === 'k' ? true : false;

  if (argvs.slice(3)) {
    let regrex = /[c|v|o|k]/g;
    if (regrex.test(argvs.slice(3))) {
      options['schema'] = argvs.slice(3);
    }
  }

  return options;
};

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
