import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const getDataFromFile = (filename) => {
  const configPath = path.resolve(process.cwd(), filename);
  const data = fs.readFileSync(configPath, 'utf-8');
  const ext = path.extname(configPath);
  const file = {
    '.json': (fileName) => JSON.parse(fileName),
    '.yml': (fileName) => yaml.safeLoad(fileName),
    '.ini': (fileName) => ini.parse(fileName),
  };
  const readData = file[ext];
  return readData(data);
};
export default getDataFromFile;
