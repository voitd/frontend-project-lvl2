import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getFile = (filename) => {
  const pathName = path.resolve(process.cwd(), filename);
  const readFile = fs.readFileSync(pathName);
  const parseFile = JSON.parse(readFile, 'utf8');
  return parseFile;
};

const genDiff = (firstConfig, secondConfig) => {
  const before = getFile(firstConfig);
  const after = getFile(secondConfig);
  const tempObj = { ...before, ...after };
  const keys = _.keys(tempObj);
  const arr = ['{'];
  const getString = keys.reduce((acc, key) => {
    let prefix = _.has(after, key) ? '+' : '-';
    const resultString = (pref, obj) => `  ${pref} ${key}: ${obj[key]}`;

    if (_.has(after, key) && _.has(before, key)) {
      if (after[key] !== before[key]) {
        prefix = '-';
        acc.push(resultString('+', before));
      }
      if (after[key] === before[key]) prefix = ' ';
    }
    return [...acc, resultString(prefix, tempObj)];
  }, arr);
  return `${getString.join('\n')}\n}`;
};

export default genDiff;
