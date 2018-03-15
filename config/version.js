var fs = require('fs');
var path = require('path');

var pkg = require('../package.json');
var version = pkg.version;

var filepath = path.resolve(__dirname, '../change.log');
var stats = fs.statSync(filepath);
if (!stats) {
console.log('Error: 文件 ' + filepath + ' 不存在!');
return false;
};
if (stats.isDirectory()) {
console.log('Error: 文件 ' + filepath + ' 格式不合法!');
return false;
};
var content = fs.readFileSync(filepath, { encoding: 'utf8' });

var data = {
  version : version,
  changelog : String(content).replace(/\n/g, '')
}

var ws = fs.createWriteStream(path.resolve(__dirname, '../static/info.json'));
ws.end(JSON.stringify(data));

module.exports = JSON.stringify(version);
