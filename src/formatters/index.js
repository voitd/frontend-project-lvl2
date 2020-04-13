import renderPlain from './renderPlain.js';
import renderTree from './renderTree.js';

const rendersType = {
  plain: renderPlain,
  tree: renderTree,
  json: JSON.stringify,
};

const render = (ast, format) => rendersType[format](ast);

export default render;
