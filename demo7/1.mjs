import babel from '@babel/core';
import * as t from '@babel/types';
import { readFileSync } from 'node:fs';
import customPlugin from './plugins/1.mjs';

const originCode = readFileSync('./originCode/1.js', { encoding: 'utf-8' });
console.log(originCode);

const options = {
  plugins: [customPlugin],
};
let res = babel.transformSync(originCode, options);
console.log(res.code);
