import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const parsers = (filename) => {
  const configPath = path.resolve(process.cwd(), filename);
  const readFile = fs.readFileSync(configPath, 'utf-8');
  const formatFile = path.extname(configPath);
  let parse;
  switch (formatFile) {
    case '.json':
      parse = JSON.parse;
      break;
    case '.yml':
      parse = yaml.safeLoad;
      break;
    case '.ini':
      parse = ini.parse;
      break;
    default:
      break;
  }
  return parse(readFile);
};
export default parsers;
