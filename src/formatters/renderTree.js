import { keys, isObject } from 'lodash';

const renderAST = (ast, depth = 1) => {
  const shift = (space) => ' '.repeat(space * 2);
  const stringify = (value, lvl) => {
    if (!isObject(value)) return value;
    return `{\n${keys(value)
      .map((key) => `${shift(lvl + 3)}${key}: ${value[key]}`)
      .join('\n')}\n${shift(lvl + 1)}}`;
  };

  const renderStringByType = {
    added: (node) => `${shift(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
    deleted: (node) => `${shift(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
    unchanged: (node) => `${shift(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
    changed: (node) => `${shift(depth)}+ ${node.key}: ${stringify(node.afterValue, depth)}\n${shift(depth)}- ${node.key}: ${stringify(node.beforeValue, depth)}`,
    nested: (node) => `${shift(depth)}  ${node.key}: {  \n${renderAST(node.children, depth + 1)}\n${shift(depth + 1)}}`,
  };

  return ast
    .map((node) => renderStringByType[node.type](node))
    .join('\n');
};
const renderTree = (ast) => ['{', renderAST(ast), '}'].join('\n');

export default renderTree;
