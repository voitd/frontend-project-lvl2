import path from 'path';
import fs from 'fs';
import genDiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const resultPlain = readFile('result-plain');
const resultJson = readFile('result-json');
const before = './__fixtures__/before';
const after = './__fixtures__/after';
describe('Testing output function', () => {
  test('Should JSON be render as string', () => {
    expect(typeof genDiff(`${before}.json`, `${after}.json`)).toBe('string');
  });
  test('Should YAML be render as string', () => {
    expect(typeof genDiff(`${before}.yml`, `${after}.yml`)).toBe('string');
  });
  test('Should INI be render as string', () => {
    expect(typeof genDiff(`${before}.ini`, `${after}.ini`)).toBe('string');
  });
});
describe('Testing output equals', () => {
  test('Should be printed plain', () => {
    expect(genDiff(`${before}.plain.json`, `${after}.plain.json`)).toEqual(resultPlain);
  });
  test('Should be JSON printed correct', () => {
    expect(genDiff(`${before}.json`, `${after}.json`)).toEqual(resultJson);
  });
  test('Should be YAML printed correct', () => {
    expect(genDiff(`${before}.yml`, `${after}.yml`)).toEqual(resultPlain);
  });
  test('Should be INI printed correct', () => {
    expect(genDiff(`${before}.ini`, `${after}.ini`)).toEqual(resultPlain);
  });
});
