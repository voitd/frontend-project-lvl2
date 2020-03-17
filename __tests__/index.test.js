import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let result;
let before;
let after;
beforeAll(() => {
  result = readFile('result-plain');
  before = './__fixtures__/before.json';
  after = './__fixtures__/after.json';
});

describe('Testing output function', () => {
  test('Should be string', () => {
    expect(typeof genDiff(before, after)).toBe('string');
  });
  test('Should be printed object as string', () => {
    expect(genDiff(before, after)).toBe(result);
  });
});
