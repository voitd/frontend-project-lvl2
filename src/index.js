import _ from 'lodash';
import getData from './getData.js';

const props = [
  {
    type: 'unchenged',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key) && (before[key] === after[key])),
    process: (before) => before,
    prefix: '   ',
  },
  {
    type: 'chenged',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key) && (before[key] !== after[key])),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
    prefix: '  +',
  },
  {
    type: 'added',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    process: (before, after) => after,
    prefix: '  +',
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    process: (before) => before,
    prefix: '  -',
  },
];

const parse = (before, after) => {
  const configKeys = _.keys({ ...before, ...after });
  const getProps = (key) => props.find(({ check }) => check(before, after, key));
  return configKeys.map((key) => {
    const { prefix, type, process } = getProps(key);
    const value = process(before[key], after[key], parse);
    return {
      key, type, value, prefix,
    };
  });
};
const render = (tree) => {
  const renderString = tree.map((node) => {
    const {
      key, type, value, prefix,
    } = node;
    const renderType = {
      unchenged: `${prefix} ${key}: ${value}`,
      chenged: `${prefix} ${key}: ${value.beforeValue}\n  - ${key}: ${value.afterValue}`,
      added: `${prefix} ${key}: ${value}`,
      deleted: `${prefix} ${key}: ${value}`,
    };
    return renderType[node.type];
  });

  const renderBody = `{\n${renderString.join('\n')}\n}`;
  return renderBody;
};

const genDiff = (firstConfig = {}, secondConfig = {}) => {
  const before = getData(firstConfig);
  const after = getData(secondConfig);
  const ast = parse(before, after);
  return render(ast);
};
export default genDiff;
