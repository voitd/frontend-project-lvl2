import { keys, isObject } from 'lodash';

const renderAST = (ast, deep = 1) => {
  const shift = (space) => ' '.repeat(space * 2);
  const stringify = (value, lvl) => (!isObject(value) ? value : `{\n${keys(value)
    .map((key) => `${shift(lvl + 3)}${key}: ${value[key]}`)
    .join('\n')}\n${shift(lvl + 1)}}`);

  const renderStringByType = {
    added: (node) => `${shift(deep)}+ ${node.key}: ${stringify(node.value, deep)}`,
    deleted: (node) => `${shift(deep)}- ${node.key}: ${stringify(node.value, deep)}`,
    unchanged: (node) => `${shift(deep)}  ${node.key}: ${stringify(node.value, deep)}`,
    changed: (node) => `${shift(deep)}+ ${node.key}: ${stringify(node.afterValue, deep)}\n${shift(deep)}- ${node.key}: ${stringify(node.beforeValue, deep)}`,
    children: (node) => `${shift(deep)}  ${node.key}: {  \n${renderAST(node.children, deep + 1)}\n${shift(deep + 1)}}`,
  };

  return ast
    .map((node) => renderStringByType[node.type](node))
    .join('\n');
};
const renderTree = (ast) => ['{', renderAST(ast), '}'].join('\n');

export default renderTree;
