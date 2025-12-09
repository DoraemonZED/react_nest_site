import { readFileSync } from 'fs';
import { load } from 'js-yaml';
import { ConfigObject } from '@nestjs/config';

export default () => {
  return load(
    readFileSync(`.env.${process.env.NODE_ENV as string}.yaml`, 'utf8'),
  ) as ConfigObject
};