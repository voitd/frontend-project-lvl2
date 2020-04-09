import renderPlain from './renderPlain.js';
import renderTree from './renderTree.js';
import makeAST from '../makeAST.js';


const rendersType = {
  plain: renderPlain,
  tree: renderTree,
  json: JSON.stringify,
};

export default (firstConfig, secondConfig, format = 'tree') => {
  const ast = makeAST(firstConfig, secondConfig);
  return rendersType[format](ast);
};
