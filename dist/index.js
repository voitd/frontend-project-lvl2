"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _getData = _interopRequireDefault(require("./getData.js"));

var _genDiff = require("./genDiff.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const genDiff = (firstConfig = {}, secondConfig = {}) => {
  const before = (0, _getData.default)(firstConfig);
  const after = (0, _getData.default)(secondConfig);
  const ast = (0, _genDiff.parse)(before, after);
  return (0, _genDiff.render)(ast);
};

var _default = genDiff;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJnZW5EaWZmIiwiZmlyc3RDb25maWciLCJzZWNvbmRDb25maWciLCJiZWZvcmUiLCJhZnRlciIsImFzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBOztBQUNBOzs7O0FBRUEsTUFBTUEsT0FBTyxHQUFHLENBQUNDLFdBQVcsR0FBRyxFQUFmLEVBQW1CQyxZQUFZLEdBQUcsRUFBbEMsS0FBeUM7QUFDdkQsUUFBTUMsTUFBTSxHQUFHLHNCQUFRRixXQUFSLENBQWY7QUFDQSxRQUFNRyxLQUFLLEdBQUcsc0JBQVFGLFlBQVIsQ0FBZDtBQUNBLFFBQU1HLEdBQUcsR0FBRyxvQkFBTUYsTUFBTixFQUFjQyxLQUFkLENBQVo7QUFDQSxTQUFPLHFCQUFPQyxHQUFQLENBQVA7QUFDRCxDQUxEOztlQU1lTCxPIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgZ2V0RGF0YSBmcm9tICcuL2dldERhdGEuanMnO1xuaW1wb3J0IHsgcGFyc2UsIHJlbmRlciB9IGZyb20gJy4vZ2VuRGlmZi5qcyc7XG5cbmNvbnN0IGdlbkRpZmYgPSAoZmlyc3RDb25maWcgPSB7fSwgc2Vjb25kQ29uZmlnID0ge30pID0+IHtcbiAgY29uc3QgYmVmb3JlID0gZ2V0RGF0YShmaXJzdENvbmZpZyk7XG4gIGNvbnN0IGFmdGVyID0gZ2V0RGF0YShzZWNvbmRDb25maWcpO1xuICBjb25zdCBhc3QgPSBwYXJzZShiZWZvcmUsIGFmdGVyKTtcbiAgcmV0dXJuIHJlbmRlcihhc3QpO1xufTtcbmV4cG9ydCBkZWZhdWx0IGdlbkRpZmY7XG4iXX0=