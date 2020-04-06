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

export const render = (ast, depth = 0) => {
  const indent = (tabs) => ' '.repeat(tabs * 2);

  const getString = (value, repeat) => {
    if (!_.isObject(value)) return value;
    return `{\n${_.keys(value)
      .map((key) => `${indent(repeat + 3)}${key}: ${value[key]}`)
      .join('\n')}\n${indent(depth + 2)}}`;
  };

  const renderString = {
    added: (node) => `${indent(depth)}+ ${node.key}: ${getString(node.value, depth)}`,
    deleted: (node) => `${indent(depth)}- ${node.key}: ${getString(node.value, depth)}`,
    unchanged: (node) => `${indent(depth)}  ${node.key}: ${getString(node.value, depth)}`,
    changed: (node) => `${indent(depth)}+ ${node.key}: ${getString(node.afterValue, depth)}\n${indent(depth)}- ${node.key}: ${getString(node.beforeValue, depth)}`,
    children: (node) => `${indent(depth)}  ${node.key}: { ${render(node.children, depth + 1)}${indent(depth + 1)}}`,

  };

  const renderResult = (tree) => tree
    .map((node) => renderString[node.type](node))
    .join('\n');
  return ['{', renderResult(ast), '}'].join('\n');
};
