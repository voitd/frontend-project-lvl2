import yaml from 'js-yaml';
import ini from 'ini';

const parserTypes = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};
const parse = (data, dataType) => parserTypes[dataType](data);

export default parse;
