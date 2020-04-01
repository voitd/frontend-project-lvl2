import path from 'path';
import fs from 'fs';
import genDiff from '../src';

// const expectedFixturePath = path.join(__dirname, '__fixtures__', 'expected');
// const rawData = fs.readFileSync(expectedFixturePath, 'utf-8');
// const expected = JSON.parse(rawData);
// expect(ast).toEqual(expected);


const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const result = readFile('result-plain');
const before = './__fixtures__/before';
const after = './__fixtures__/after';
describe('Testing JSON output function', () => {
  test('Should be string', () => {
    expect(typeof genDiff(`${before}.json`, `${after}.json`)).toBe('string');
  });
  test('Should be printed object as string', () => {
    expect(genDiff(`${before}.json`, `${after}.json`)).toBe(result);
  });
});
describe('Testing Yaml output function', () => {
  test('Should be string', () => {
    expect(typeof genDiff(`${before}.yml`, `${after}.yml`)).toBe('string');
  });
  test('Should be printed object as string', () => {
    expect(genDiff(`${before}.yml`, `${after}.yml`)).toBe(result);
  });
});
describe('Testing ini output function', () => {
  test('Should be string', () => {
    expect(typeof genDiff(`${before}.ini`, `${after}.ini`)).toBe('string');
  });
  test('Should be printed object as string', () => {
    expect(genDiff(`${before}.ini`, `${after}.ini`)).toBe(result);
  });
});
