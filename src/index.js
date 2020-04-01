import _ from 'lodash';
import parsers from './parsers.js';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml'
import ini from 'ini'

const getData = (filename) => {
  const configPath = path.resolve(process.cwd(), filename);
  const data = fs.readFileSync(configPath, 'utf-8');
  const ext = path.extname(configPath);
  const file = {
    '.json': (file) => JSON.parse(file),
    '.yml': (file) => yaml.safeLoad(file),
    '.ini': (file) => ini.parse(file),
  }
  const readData = file[ext];
  return readData(data)
};
const props = [
  {
    type: 'unchenged',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key) && (before[key] === after[key])),
    process: (before, after) => before,
    prefix: '   ',
  },
  {
    type: 'chenged',
    check: (before, after, key) => (_.has(before, key) && _.has(after, key) && (before[key] !== after[key])),
    process: (before, after) => ({ beforeValue: before, afterValue: after }),
    prefix: '  +',
  },
  {
    type: 'added',
    check: (before, after, key) => (!_.has(before, key) && _.has(after, key)),
    process: (before, after) => after,
    prefix: '  +',
  },
  {
    type: 'deleted',
    check: (before, after, key) => (_.has(before, key) && !_.has(after, key)),
    process: (before, after) => before,
    prefix: '  -',
  },
];

const parse = (before, after) => {
  const tempObj = { ...before, ...after };
  const configKeys = _.keys(tempObj);
  const getProps = (key) => props.find(({ check }) => check(before, after, key));
  return configKeys.map((key) => {
    const { prefix, type, process } = getProps(key)
    const value = process(before[key], after[key], parse)
    return { key: key, type, value, prefix }
  })
};
const render = (tree) => {
  const space = '  '

  const renderString = tree.map((node) => {
    const { key, type, value, prefix } = node
    const renderType = {
      unchenged: `${prefix}${key}: ${value}`,
      chenged: `${prefix}${key}: ${value.afterValue},\n  -${key}: ${value.beforeValue}`,
      added: `${prefix}${key}: ${value}`,
      deleted: `${prefix}${key}: ${value}`,
    }
    return renderType[node.type]
  })

  const renderBody = `{\n${renderString.join('\n')}\n}`
  return renderBody
};                

const genDiff = (firstConfig = {}, secondConfig = {}) => {
  const before = getData(firstConfig);
  const after = getData(secondConfig);
  const ast = parse(before, after);
  return render(ast);
}
export default genDiff;
