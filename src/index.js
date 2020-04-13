import fs from 'fs';
import path from 'path';
import parse from './parsers';
import render from './formatters';
import makeAST from './makeAST';

const getDataFromFile = (filename) => {
  const pathToFile = path.resolve(process.cwd(), filename);
  const data = fs.readFileSync(pathToFile, 'utf-8');
  const fileExtension = path.extname(pathToFile);
  return parse(data, fileExtension);
};

const genDiff = (firstConfig, secondConfig, format = 'tree') => {
  const before = getDataFromFile(firstConfig);
  const after = getDataFromFile(secondConfig);
  const ast = makeAST(before, after);
  return render(ast, format);
};
export default genDiff;
