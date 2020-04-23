import yaml from 'js-yaml';
import ini from 'ini';

const dataTypes = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.parse,
};
const parse = (data, dataType) => dataTypes[dataType](data);

export default parse;
