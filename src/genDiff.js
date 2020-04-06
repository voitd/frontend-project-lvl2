import _ from 'lodash';

const props = [
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
    check: (before, after, key) => _.has(before, key) && _.has(after, key) && before[key] === after[key],
    process: (before) => ({ value: before }),
  },
  {
    type: 'changed',
    check: (before, after, key) => _.has(before, key) && _.has(after, key) && before[key] !== after[key],
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
  },
];

export const parse = (before, after) => {
  const configKeys = _.keys({ ...before, ...after });
  const getProps = (key) => props.find(({ check }) => check(before, after, key));
  return configKeys.map((key) => {
    const { type, process } = getProps(key);
    const value = process(before[key], after[key], parse);
    return { key, type, ...value };
  });
};

export const render = (ast, lvl = 0) => {
  const indent = (tab) => ' '.repeat(lvl + tab);

  const getString = (value, depth) => {
    if (!_.isObject(value)) return value;
    return `{\n${indent(1)}${_.keys(value)
      .map((key) => `${indent(1)}  ${key}: ${getString(value[key], depth)}`)
      .join('\n')}\n${indent(1)}}`;
  };

  const renderString = {
    added: (node) => `${indent(1)} + ${node.key}: ${getString(node.value, lvl + 1)}`,
    deleted: (node) => `${indent(1)} - ${node.key}: ${getString(node.value, lvl + 1)}`,
    unchanged: (node) => `${indent(1)}   ${node.key}: ${getString(node.value, lvl + 1)}`,
    changed: (node) => `${indent(1)} + ${node.key}: ${getString(node.afterValue, lvl + 1)}\n${indent(
      2,
    )} - ${node.key}: ${getString(node.beforeValue, lvl + 1)}`,
    children: (node) => `${indent(1)}${node.key}: ${render(node.children)}`,
  };

  const renderResult = (tree) => tree.map((node) => renderString[node.type](node)).join(`\n${indent(1)}`);
  return `{\n${indent(1)}${renderResult(ast)}\n${indent(0)}}`;
};
