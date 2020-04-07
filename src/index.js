
import getDataFromFile from './getDataFromFile.js';
import { makeAST, printAST } from './formatters/render-tree.js';

const genDiff = (firstConfig, secondConfig) => {
  const before = getDataFromFile(firstConfig);
  const after = getDataFromFile(secondConfig);
  const ast = makeAST(before, after);
  return printAST(ast);
};
export default genDiff;
