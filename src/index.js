
import getDataFromFile from './parsers';
import render from './formatters';

const genDiff = (firstConfig, secondConfig, format = 'tree') => {
  const before = getDataFromFile(firstConfig);
  const after = getDataFromFile(secondConfig);
  return render(before, after, format);
};
export default genDiff;
