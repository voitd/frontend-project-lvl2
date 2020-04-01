"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _jsYaml = _interopRequireDefault(require("js-yaml"));

var _ini = _interopRequireDefault(require("ini"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getData = filename => {
  const configPath = _path.default.resolve(process.cwd(), filename);

  const data = _fs.default.readFileSync(configPath, 'utf-8');

  const ext = _path.default.extname(configPath);

  const file = {
    '.json': fileName => JSON.parse(fileName),
    '.yml': fileName => _jsYaml.default.safeLoad(fileName),
    '.ini': fileName => _ini.default.parse(fileName)
  };
  const readData = file[ext];
  return readData(data);
};

var _default = getData;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9nZXREYXRhLmpzIl0sIm5hbWVzIjpbImdldERhdGEiLCJmaWxlbmFtZSIsImNvbmZpZ1BhdGgiLCJwYXRoIiwicmVzb2x2ZSIsInByb2Nlc3MiLCJjd2QiLCJkYXRhIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJleHQiLCJleHRuYW1lIiwiZmlsZSIsImZpbGVOYW1lIiwiSlNPTiIsInBhcnNlIiwieWFtbCIsInNhZmVMb2FkIiwiaW5pIiwicmVhZERhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU1BLE9BQU8sR0FBSUMsUUFBRCxJQUFjO0FBQzVCLFFBQU1DLFVBQVUsR0FBR0MsY0FBS0MsT0FBTCxDQUFhQyxPQUFPLENBQUNDLEdBQVIsRUFBYixFQUE0QkwsUUFBNUIsQ0FBbkI7O0FBQ0EsUUFBTU0sSUFBSSxHQUFHQyxZQUFHQyxZQUFILENBQWdCUCxVQUFoQixFQUE0QixPQUE1QixDQUFiOztBQUNBLFFBQU1RLEdBQUcsR0FBR1AsY0FBS1EsT0FBTCxDQUFhVCxVQUFiLENBQVo7O0FBQ0EsUUFBTVUsSUFBSSxHQUFHO0FBQ1gsYUFBVUMsUUFBRCxJQUFjQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0YsUUFBWCxDQURaO0FBRVgsWUFBU0EsUUFBRCxJQUFjRyxnQkFBS0MsUUFBTCxDQUFjSixRQUFkLENBRlg7QUFHWCxZQUFTQSxRQUFELElBQWNLLGFBQUlILEtBQUosQ0FBVUYsUUFBVjtBQUhYLEdBQWI7QUFLQSxRQUFNTSxRQUFRLEdBQUdQLElBQUksQ0FBQ0YsR0FBRCxDQUFyQjtBQUNBLFNBQU9TLFFBQVEsQ0FBQ1osSUFBRCxDQUFmO0FBQ0QsQ0FYRDs7ZUFZZVAsTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB5YW1sIGZyb20gJ2pzLXlhbWwnO1xuaW1wb3J0IGluaSBmcm9tICdpbmknO1xuXG5jb25zdCBnZXREYXRhID0gKGZpbGVuYW1lKSA9PiB7XG4gIGNvbnN0IGNvbmZpZ1BhdGggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZmlsZW5hbWUpO1xuICBjb25zdCBkYXRhID0gZnMucmVhZEZpbGVTeW5jKGNvbmZpZ1BhdGgsICd1dGYtOCcpO1xuICBjb25zdCBleHQgPSBwYXRoLmV4dG5hbWUoY29uZmlnUGF0aCk7XG4gIGNvbnN0IGZpbGUgPSB7XG4gICAgJy5qc29uJzogKGZpbGVOYW1lKSA9PiBKU09OLnBhcnNlKGZpbGVOYW1lKSxcbiAgICAnLnltbCc6IChmaWxlTmFtZSkgPT4geWFtbC5zYWZlTG9hZChmaWxlTmFtZSksXG4gICAgJy5pbmknOiAoZmlsZU5hbWUpID0+IGluaS5wYXJzZShmaWxlTmFtZSksXG4gIH07XG4gIGNvbnN0IHJlYWREYXRhID0gZmlsZVtleHRdO1xuICByZXR1cm4gcmVhZERhdGEoZGF0YSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgZ2V0RGF0YTtcbiJdfQ==