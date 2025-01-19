import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { join } from 'path';

const configFileNameObj = {
  development: 'development',
  production: 'production',
};

export default () => {
  return load(
    readFileSync(
      join(__dirname, `../config/${configFileNameObj[process.env.NODE_ENV]}.yml`),
      'utf8',
    ),
  );
};
