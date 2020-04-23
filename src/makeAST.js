import {
  has, keys, isObject, union,
} from 'lodash';

const nodeProperties = [
  {
    type: 'nested',
    check: (before, after, key) => isObject(before[key]) && isObject(after[key]),
    process: (before, after, fn) => ({ children: fn(before, after) }),
  },
  {
    type: 'added',
    check: (before, after, key) => !has(before, key) && has(after, key),
    process: (before, after) => ({ value: after }),
  },
  {
    type: 'deleted',
    check: (before, after, key) => has(before, key) && !has(after, key),
    process: (before) => ({ value: before }),
  },
  {
    type: 'unchanged',
    check: (before, after, key) => has(before, key) && has(after, key)
    && before[key] === after[key],
    process: (before) => ({ value: before }),
  },
  {
    type: 'changed',
    check: (before, after, key) => has(before, key) && has(after, key)
    && before[key] !== after[key],
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
];

const makeAST = (before, after) => {
  const configKeys = union(keys(before), keys(after));
  const getNodeProperties = (key) => nodeProperties.find(({ check }) => check(before, after, key));
  return configKeys.map((key) => {
    const { type, process } = getNodeProperties(key);
    const data = process(before[key], after[key], makeAST);
    return { key, type, ...data };
  });
};
export default makeAST;
