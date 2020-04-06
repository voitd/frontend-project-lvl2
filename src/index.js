
import getData from './getData.js';
import { parse, render } from './genDiff.js';

const genDiff = (firstConfig = {}, secondConfig = {}) => {
  const before = getData(firstConfig);
  const after = getData(secondConfig);
  const ast = parse(before, after);
  return render(ast);
};
export default genDiff;
