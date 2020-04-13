import yaml from 'js-yaml';
import ini from 'ini';

const fileTypes = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};
const parse = (data, fileExtension) => fileTypes[fileExtension](data);

export default parse;
