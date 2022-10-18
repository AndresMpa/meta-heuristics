import * as dotenv from 'dotenv';

const getProcessData = () => {
  const result = dotenv.config();

  if (result.error) {
    throw result.error;
  }

  return result.parsed;
};

export { getProcessData };
