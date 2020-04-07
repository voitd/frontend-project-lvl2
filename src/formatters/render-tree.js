import _ from 'lodash';

const nodeProperties = [
  {
    type: 'children',
    check: (before, after, key) => _.isObject(before[key]) && _.isObject(after[key]),
    process: (before, after, fn) => ({ children: fn(before, after) }),
  },
  {
    type: 'added',
    check: (before, after, key) => !_.has(before, key) && _.has(after, key),
    process: (before, after) => ({ value: after }),
  },
  {
    type: 'deleted',
    check: (before, after, key) => _.has(before, key) && !_.has(after, key),
    process: (before) => ({ value: before }),
  },
  {
    type: 'unchanged',
    check: (before, after, key) => _.has(before, key) && _.has(after, key)
    && before[key] === after[key],
    process: (before) => ({ value: before }),
  },
  {
    type: 'changed',
    check: (before, after, key) => _.has(before, key) && _.has(after, key)
    && before[key] !== after[key],
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
];

export const makeAST = (before, after) => {
  const configKeys = _.keys({ ...before, ...after });
  const getNodeProperties = (key) => nodeProperties.find(({ check }) => check(before, after, key));
  return configKeys.map((key) => {
    const { type, process } = getNodeProperties(key);
    const value = process(before[key], after[key], makeAST);
    return { key, type, ...value };
  });
};

const renderAST = (ast, deep = 1) => {
  const shift = (space) => ' '.repeat(space * 2);
  const stringify = (value, lvl) => {
    if (!_.isObject(value)) return value;
    return `{\n${_.keys(value)
      .map((key) => `${shift(lvl + 3)}${key}: ${value[key]}`)
      .join('\n')}\n${shift(lvl + 1)}}`;
  };
  const renderStringByType = {
    added: (node) => `${shift(deep)}+ ${node.key}: ${stringify(node.value, deep)}`,
    deleted: (node) => `${shift(deep)}- ${node.key}: ${stringify(node.value, deep)}`,
    unchanged: (node) => `${shift(deep)}  ${node.key}: ${stringify(node.value, deep)}`,
    changed: (node) => `${shift(deep)}+ ${node.key}: ${stringify(node.afterValue, deep)}\n${shift(
      deep,
    )}- ${node.key}: ${stringify(node.beforeValue, deep)}`,
    children: (node) => `${shift(deep)}  ${node.key}: {  \n${renderAST(node.children, deep + 1)}\n${shift(
      deep + 1,
    )}}`,
  };
  return ast.map((node) => renderStringByType[node.type](node)).join('\n');
};

export const printAST = (ast) => ['{', renderAST(ast), '}'].join('\n');
