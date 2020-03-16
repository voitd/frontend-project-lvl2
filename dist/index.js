"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getFile = filename => {
  const pathName = _path.default.resolve(process.cwd(), filename);

  const readFile = _fs.default.readFileSync(pathName);

  const parseFile = JSON.parse(readFile);
  return parseFile;
};

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

    let resultString = (prefix, key, obj) => `  ${prefix} ${key}: ${obj[key]}`;

    if (_lodash.default.has(after, key) && _lodash.default.has(before, key)) {
      if (after[key] !== before[key]) {
        prefix = '-';
        acc.push(resultString('+', key, before));
      }

      if (after[key] === before[key]) prefix = ' ';
    }

    return [...acc, resultString(prefix, key, tempObj)];
  }, arr);
  return `${getString.join('\n')}\n}`;
};

var _default = genDiff;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZXRGaWxlIiwiZmlsZW5hbWUiLCJwYXRoTmFtZSIsInBhdGgiLCJyZXNvbHZlIiwicHJvY2VzcyIsImN3ZCIsInJlYWRGaWxlIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJwYXJzZUZpbGUiLCJKU09OIiwicGFyc2UiLCJnZW5EaWZmIiwiZmlyc3RDb25maWciLCJzZWNvbmRDb25maWciLCJiZWZvcmUiLCJhZnRlciIsInRlbXBPYmoiLCJrZXlzIiwiXyIsImFyciIsImdldFN0cmluZyIsInJlZHVjZSIsImFjYyIsImtleSIsInByZWZpeCIsImhhcyIsInJlc3VsdFN0cmluZyIsIm9iaiIsInB1c2giLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxNQUFNQSxPQUFPLEdBQUlDLFFBQUQsSUFBYztBQUM1QixRQUFNQyxRQUFRLEdBQUdDLGNBQUtDLE9BQUwsQ0FBYUMsT0FBTyxDQUFDQyxHQUFSLEVBQWIsRUFBNEJMLFFBQTVCLENBQWpCOztBQUNBLFFBQU1NLFFBQVEsR0FBR0MsWUFBR0MsWUFBSCxDQUFnQlAsUUFBaEIsQ0FBakI7O0FBQ0EsUUFBTVEsU0FBUyxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0wsUUFBWCxDQUFsQjtBQUNBLFNBQU9HLFNBQVA7QUFDRCxDQUxEOztBQU9BLE1BQU1HLE9BQU8sR0FBRyxDQUFDQyxXQUFELEVBQWNDLFlBQWQsS0FBK0I7QUFDN0MsUUFBTUMsTUFBTSxHQUFHaEIsT0FBTyxDQUFDYyxXQUFELENBQXRCO0FBQ0EsUUFBTUcsS0FBSyxHQUFHakIsT0FBTyxDQUFDZSxZQUFELENBQXJCO0FBQ0EsUUFBTUcsT0FBTyxHQUFHLEVBQUUsR0FBR0YsTUFBTDtBQUFhLE9BQUdDO0FBQWhCLEdBQWhCOztBQUNBLFFBQU1FLElBQUksR0FBR0MsZ0JBQUVELElBQUYsQ0FBT0QsT0FBUCxDQUFiOztBQUNBLFFBQU1HLEdBQUcsR0FBRyxDQUFDLEdBQUQsQ0FBWjtBQUNBLFFBQU1DLFNBQVMsR0FBR0gsSUFBSSxDQUFDSSxNQUFMLENBQVksQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDMUMsUUFBSUMsTUFBTSxHQUFHTixnQkFBRU8sR0FBRixDQUFNVixLQUFOLEVBQWFRLEdBQWIsSUFBb0IsR0FBcEIsR0FBMEIsR0FBdkM7O0FBQ0EsUUFBSUcsWUFBWSxHQUFHLENBQUNGLE1BQUQsRUFBU0QsR0FBVCxFQUFjSSxHQUFkLEtBQXVCLEtBQUlILE1BQU8sSUFBR0QsR0FBSSxLQUFJSSxHQUFHLENBQUNKLEdBQUQsQ0FBTSxFQUF6RTs7QUFFQSxRQUFJTCxnQkFBRU8sR0FBRixDQUFNVixLQUFOLEVBQWFRLEdBQWIsS0FBcUJMLGdCQUFFTyxHQUFGLENBQU1YLE1BQU4sRUFBY1MsR0FBZCxDQUF6QixFQUE2QztBQUMzQyxVQUFJUixLQUFLLENBQUNRLEdBQUQsQ0FBTCxLQUFlVCxNQUFNLENBQUNTLEdBQUQsQ0FBekIsRUFBZ0M7QUFDOUJDLFFBQUFBLE1BQU0sR0FBRyxHQUFUO0FBQ0FGLFFBQUFBLEdBQUcsQ0FBQ00sSUFBSixDQUFTRixZQUFZLENBQUMsR0FBRCxFQUFNSCxHQUFOLEVBQVdULE1BQVgsQ0FBckI7QUFDRDs7QUFDRCxVQUFJQyxLQUFLLENBQUNRLEdBQUQsQ0FBTCxLQUFlVCxNQUFNLENBQUNTLEdBQUQsQ0FBekIsRUFBZ0NDLE1BQU0sR0FBRyxHQUFUO0FBQ2pDOztBQUNELFdBQU8sQ0FBQyxHQUFHRixHQUFKLEVBQVNJLFlBQVksQ0FBQ0YsTUFBRCxFQUFTRCxHQUFULEVBQWNQLE9BQWQsQ0FBckIsQ0FBUDtBQUNELEdBWmlCLEVBWWZHLEdBWmUsQ0FBbEI7QUFhQSxTQUFRLEdBQUVDLFNBQVMsQ0FBQ1MsSUFBVixDQUFlLElBQWYsQ0FBcUIsS0FBL0I7QUFDRCxDQXBCRDs7ZUFzQmVsQixPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5jb25zdCBnZXRGaWxlID0gKGZpbGVuYW1lKSA9PiB7XG4gIGNvbnN0IHBhdGhOYW1lID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGZpbGVuYW1lKTtcbiAgY29uc3QgcmVhZEZpbGUgPSBmcy5yZWFkRmlsZVN5bmMocGF0aE5hbWUpO1xuICBjb25zdCBwYXJzZUZpbGUgPSBKU09OLnBhcnNlKHJlYWRGaWxlKTtcbiAgcmV0dXJuIHBhcnNlRmlsZTtcbn07XG5cbmNvbnN0IGdlbkRpZmYgPSAoZmlyc3RDb25maWcsIHNlY29uZENvbmZpZykgPT4ge1xuICBjb25zdCBiZWZvcmUgPSBnZXRGaWxlKGZpcnN0Q29uZmlnKTtcbiAgY29uc3QgYWZ0ZXIgPSBnZXRGaWxlKHNlY29uZENvbmZpZyk7XG4gIGNvbnN0IHRlbXBPYmogPSB7IC4uLmJlZm9yZSwgLi4uYWZ0ZXIgfTtcbiAgY29uc3Qga2V5cyA9IF8ua2V5cyh0ZW1wT2JqKTtcbiAgY29uc3QgYXJyID0gWyd7J107XG4gIGNvbnN0IGdldFN0cmluZyA9IGtleXMucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgIGxldCBwcmVmaXggPSBfLmhhcyhhZnRlciwga2V5KSA/ICcrJyA6ICctJztcbiAgICBsZXQgcmVzdWx0U3RyaW5nID0gKHByZWZpeCwga2V5LCBvYmopID0+IGAgICR7cHJlZml4fSAke2tleX06ICR7b2JqW2tleV19YDtcblxuICAgIGlmIChfLmhhcyhhZnRlciwga2V5KSAmJiBfLmhhcyhiZWZvcmUsIGtleSkpIHtcbiAgICAgIGlmIChhZnRlcltrZXldICE9PSBiZWZvcmVba2V5XSkge1xuICAgICAgICBwcmVmaXggPSAnLSc7XG4gICAgICAgIGFjYy5wdXNoKHJlc3VsdFN0cmluZygnKycsIGtleSwgYmVmb3JlKSk7XG4gICAgICB9XG4gICAgICBpZiAoYWZ0ZXJba2V5XSA9PT0gYmVmb3JlW2tleV0pIHByZWZpeCA9ICcgJztcbiAgICB9XG4gICAgcmV0dXJuIFsuLi5hY2MsIHJlc3VsdFN0cmluZyhwcmVmaXgsIGtleSwgdGVtcE9iaildO1xuICB9LCBhcnIpO1xuICByZXR1cm4gYCR7Z2V0U3RyaW5nLmpvaW4oJ1xcbicpfVxcbn1gO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZ2VuRGlmZjtcbiJdfQ==