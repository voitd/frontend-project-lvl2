import isObject from 'lodash/isObject';

const renderPlain = (ast, path = '') => {
  const stringify = (value) => (isObject(value) ? '[complex value]' : value);
  const renderStringByType = {
    added: (node) => `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`,
    deleted: (node) => `Property '${path}${node.key}' was deleted`,
    unchanged: (node) => `Property '${path}${node.key}' was unchanged`,
    changed: (node) => `Property '${path}${node.key}' was changed from ${stringify(
      node.afterValue,
    )} to ${stringify(node.beforeValue)}`,
    children: (node) => `${renderPlain(node.children, `${path}${node.key}.`)}`,
  };

  return ast
    .map((node) => renderStringByType[node.type](node))
    .join('\n');
};

export default renderPlain;
