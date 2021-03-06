import { keys, isObject } from 'lodash';

const renderAST = (ast, depth = 1) => {
  const indent = (space) => ' '.repeat(space * 2);
  const stringify = (value, lvl) => {
    if (!isObject(value)) return value;
    return `{\n${keys(value)
      .map((key) => `${indent(lvl + 3)}${key}: ${value[key]}`)
      .join('\n')}\n${indent(lvl + 1)}}`;
  };

  const renderStringByType = {
    added: (node) => `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`,
    deleted: (node) => `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`,
    unchanged: (node) => `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`,
    changed: (node) => `${indent(depth)}+ ${node.key}: ${stringify(node.afterValue, depth)}\n${indent(depth)}- ${node.key}: ${stringify(node.beforeValue, depth)}`,
    nested: (node) => `${indent(depth)}  ${node.key}: {  \n${renderAST(node.children, depth + 1)}\n${indent(depth + 1)}}`,
  };

  return ast
    .map((node) => renderStringByType[node.type](node))
    .join('\n');
};
const renderTree = (ast) => ['{', renderAST(ast), '}'].join('\n');

export default renderTree;
