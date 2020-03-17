"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.genDiff = exports.getFile = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFile = filename => {
  const pathName = _path.default.resolve(process.cwd(), filename);

  const readFile = _fs.default.readFileSync(pathName);

  const parseFile = JSON.parse(readFile, 'utf8');
  return parseFile;
};

exports.getFile = getFile;

const genDiff = (firstConfig, secondConfig) => {
  const before = getFile(firstConfig);
  const after = getFile(secondConfig);
  const tempObj = { ...before,
    ...after
  };

  const keys = _lodash.default.keys(tempObj);

  const arr = ['{'];
  const getString = keys.reduce((acc, key) => {
    let prefix = _lodash.default.has(after, key) ? '+' : '-';

    const resultString = (pref, obj) => `  ${pref} ${key}: ${obj[key]}`;

    if (_lodash.default.has(after, key) && _lodash.default.has(before, key)) {
      if (after[key] !== before[key]) {
        prefix = '-';
        acc.push(resultString('+', before));
      }

      if (after[key] === before[key]) prefix = ' ';
    }

    return [...acc, resultString(prefix, tempObj)];
  }, arr);
  return `${getString.join('\n')}\n}`;
};

exports.genDiff = genDiff;
var _default = genDiff;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRGaWxlIiwiZmlsZW5hbWUiLCJwYXRoTmFtZSIsInBhdGgiLCJyZXNvbHZlIiwicHJvY2VzcyIsImN3ZCIsInJlYWRGaWxlIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJwYXJzZUZpbGUiLCJKU09OIiwicGFyc2UiLCJnZW5EaWZmIiwiZmlyc3RDb25maWciLCJzZWNvbmRDb25maWciLCJiZWZvcmUiLCJhZnRlciIsInRlbXBPYmoiLCJrZXlzIiwiXyIsImFyciIsImdldFN0cmluZyIsInJlZHVjZSIsImFjYyIsImtleSIsInByZWZpeCIsImhhcyIsInJlc3VsdFN0cmluZyIsInByZWYiLCJvYmoiLCJwdXNoIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUNBOzs7O0FBRU8sTUFBTUEsT0FBTyxHQUFJQyxRQUFELElBQWM7QUFDbkMsUUFBTUMsUUFBUSxHQUFHQyxjQUFLQyxPQUFMLENBQWFDLE9BQU8sQ0FBQ0MsR0FBUixFQUFiLEVBQTRCTCxRQUE1QixDQUFqQjs7QUFDQSxRQUFNTSxRQUFRLEdBQUdDLFlBQUdDLFlBQUgsQ0FBZ0JQLFFBQWhCLENBQWpCOztBQUNBLFFBQU1RLFNBQVMsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdMLFFBQVgsRUFBcUIsTUFBckIsQ0FBbEI7QUFDQSxTQUFPRyxTQUFQO0FBQ0QsQ0FMTTs7OztBQU9BLE1BQU1HLE9BQU8sR0FBRyxDQUFDQyxXQUFELEVBQWNDLFlBQWQsS0FBK0I7QUFDcEQsUUFBTUMsTUFBTSxHQUFHaEIsT0FBTyxDQUFDYyxXQUFELENBQXRCO0FBQ0EsUUFBTUcsS0FBSyxHQUFHakIsT0FBTyxDQUFDZSxZQUFELENBQXJCO0FBQ0EsUUFBTUcsT0FBTyxHQUFHLEVBQUUsR0FBR0YsTUFBTDtBQUFhLE9BQUdDO0FBQWhCLEdBQWhCOztBQUNBLFFBQU1FLElBQUksR0FBR0MsZ0JBQUVELElBQUYsQ0FBT0QsT0FBUCxDQUFiOztBQUNBLFFBQU1HLEdBQUcsR0FBRyxDQUFDLEdBQUQsQ0FBWjtBQUNBLFFBQU1DLFNBQVMsR0FBR0gsSUFBSSxDQUFDSSxNQUFMLENBQVksQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDMUMsUUFBSUMsTUFBTSxHQUFHTixnQkFBRU8sR0FBRixDQUFNVixLQUFOLEVBQWFRLEdBQWIsSUFBb0IsR0FBcEIsR0FBMEIsR0FBdkM7O0FBQ0EsVUFBTUcsWUFBWSxHQUFHLENBQUNDLElBQUQsRUFBT0MsR0FBUCxLQUFnQixLQUFJRCxJQUFLLElBQUdKLEdBQUksS0FBSUssR0FBRyxDQUFDTCxHQUFELENBQU0sRUFBbEU7O0FBRUEsUUFBSUwsZ0JBQUVPLEdBQUYsQ0FBTVYsS0FBTixFQUFhUSxHQUFiLEtBQXFCTCxnQkFBRU8sR0FBRixDQUFNWCxNQUFOLEVBQWNTLEdBQWQsQ0FBekIsRUFBNkM7QUFDM0MsVUFBSVIsS0FBSyxDQUFDUSxHQUFELENBQUwsS0FBZVQsTUFBTSxDQUFDUyxHQUFELENBQXpCLEVBQWdDO0FBQzlCQyxRQUFBQSxNQUFNLEdBQUcsR0FBVDtBQUNBRixRQUFBQSxHQUFHLENBQUNPLElBQUosQ0FBU0gsWUFBWSxDQUFDLEdBQUQsRUFBTVosTUFBTixDQUFyQjtBQUNEOztBQUNELFVBQUlDLEtBQUssQ0FBQ1EsR0FBRCxDQUFMLEtBQWVULE1BQU0sQ0FBQ1MsR0FBRCxDQUF6QixFQUFnQ0MsTUFBTSxHQUFHLEdBQVQ7QUFDakM7O0FBQ0QsV0FBTyxDQUFDLEdBQUdGLEdBQUosRUFBU0ksWUFBWSxDQUFDRixNQUFELEVBQVNSLE9BQVQsQ0FBckIsQ0FBUDtBQUNELEdBWmlCLEVBWWZHLEdBWmUsQ0FBbEI7QUFhQSxTQUFRLEdBQUVDLFNBQVMsQ0FBQ1UsSUFBVixDQUFlLElBQWYsQ0FBcUIsS0FBL0I7QUFDRCxDQXBCTTs7O2VBc0JRbkIsTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjb25zdCBnZXRGaWxlID0gKGZpbGVuYW1lKSA9PiB7XG4gIGNvbnN0IHBhdGhOYW1lID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGZpbGVuYW1lKTtcbiAgY29uc3QgcmVhZEZpbGUgPSBmcy5yZWFkRmlsZVN5bmMocGF0aE5hbWUpO1xuICBjb25zdCBwYXJzZUZpbGUgPSBKU09OLnBhcnNlKHJlYWRGaWxlLCAndXRmOCcpO1xuICByZXR1cm4gcGFyc2VGaWxlO1xufTtcblxuZXhwb3J0IGNvbnN0IGdlbkRpZmYgPSAoZmlyc3RDb25maWcsIHNlY29uZENvbmZpZykgPT4ge1xuICBjb25zdCBiZWZvcmUgPSBnZXRGaWxlKGZpcnN0Q29uZmlnKTtcbiAgY29uc3QgYWZ0ZXIgPSBnZXRGaWxlKHNlY29uZENvbmZpZyk7XG4gIGNvbnN0IHRlbXBPYmogPSB7IC4uLmJlZm9yZSwgLi4uYWZ0ZXIgfTtcbiAgY29uc3Qga2V5cyA9IF8ua2V5cyh0ZW1wT2JqKTtcbiAgY29uc3QgYXJyID0gWyd7J107XG4gIGNvbnN0IGdldFN0cmluZyA9IGtleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGxldCBwcmVmaXggPSBfLmhhcyhhZnRlciwga2V5KSA/ICcrJyA6ICctJztcbiAgICBjb25zdCByZXN1bHRTdHJpbmcgPSAocHJlZiwgb2JqKSA9PiBgICAke3ByZWZ9ICR7a2V5fTogJHtvYmpba2V5XX1gO1xuXG4gICAgaWYgKF8uaGFzKGFmdGVyLCBrZXkpICYmIF8uaGFzKGJlZm9yZSwga2V5KSkge1xuICAgICAgaWYgKGFmdGVyW2tleV0gIT09IGJlZm9yZVtrZXldKSB7XG4gICAgICAgIHByZWZpeCA9ICctJztcbiAgICAgICAgYWNjLnB1c2gocmVzdWx0U3RyaW5nKCcrJywgYmVmb3JlKSk7XG4gICAgICB9XG4gICAgICBpZiAoYWZ0ZXJba2V5XSA9PT0gYmVmb3JlW2tleV0pIHByZWZpeCA9ICcgJztcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5hY2MsIHJlc3VsdFN0cmluZyhwcmVmaXgsIHRlbXBPYmopXTtcbiAgfSwgYXJyKTtcbiAgcmV0dXJuIGAke2dldFN0cmluZy5qb2luKCdcXG4nKX1cXG59YDtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGdlbkRpZmY7XG4iXX0=