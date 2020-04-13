import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const resultFiles = {
  plain: 'result-plain',
  json: 'result-json',
  tree: 'result-tree',
};

describe(' Testing output equals', () => {
  test.each`
    config1         | config2           | format     
   ${'before.json'} | ${'after.json'}   | ${'plain'} 
   ${'before.json'} | ${'after.json'}   | ${'json'}  
   ${'before.yml'}  | ${'after.yml'}    | ${'tree'} 
   ${'before.ini'}  | ${'after.ini'}    | ${'tree'}  
`('compare configs $config1 > $config2, should be $format-like formats', ({
  config1,
  config2,
  format,
}) => {
  const before = getFixturePath(config1);
  const after = getFixturePath(config2);
  const expected = readFile(resultFiles[format]);
  expect(genDiff(before, after, format)).toBe(expected);
});
});
