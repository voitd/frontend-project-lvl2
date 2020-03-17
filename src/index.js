import _ from 'lodash';
import parsers from './parsers.js';

const genDiff = (firstConfig, secondConfig) => {
  const before = parsers(firstConfig);
  const after = parsers(secondConfig);
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
