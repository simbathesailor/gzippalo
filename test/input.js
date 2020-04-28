import { pipeline } from 'stream';
import glob from 'glob';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import zlib from 'zlib';

var main = function main(options) {
  try {
    var Files = getFilesTogZip(options);
    return Promise.resolve(
      gZipFiles({
        files: Files,
        options: options,
      })
    ).then(function() {});
  } catch (e) {
    return Promise.reject(e);
  }
};

var gZipFiles = function gZipFiles(_ref) {
  var files = _ref.files,
    options = _ref.options;

  try {
    if (files) {
      var destination = options.destination,
        _options$globOptions2 = options.globOptions,
        globOptions =
          _options$globOptions2 === void 0
            ? defaultOptions.globOptions
            : _options$globOptions2;
      var cwd = globOptions.cwd;
      files.forEach(function(each) {
        try {
          var pathToCheckAndUpdate = path.join(cwd || __dirname, each);
          var finaldestination = pathToCheckAndUpdate;

          if (destination) {
            finaldestination = destination;
          }

          return Promise.resolve(
            doGzip(pathToCheckAndUpdate, finaldestination + '.gz')
          ).then(function() {});
        } catch (e) {
          return Promise.reject(e);
        }
      });
    }

    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

var doGzip = function doGzip(inputPath, outputPath) {
  try {
    var gzip = createGzip();
    var source = createReadStream(inputPath);
    var destination = createWriteStream(outputPath);
    return Promise.resolve(pipe(source, gzip, destination)).then(function() {});
  } catch (e) {
    return Promise.reject(e);
  }
};

var createGzip = zlib.createGzip;
var pipe = /*#__PURE__*/ promisify(pipeline);
var defaultOptions = {
  globOptions: {
    cwd: __dirname,
  },
  pattern: '*',
  updateInline: true,
  debug: false,
  destination: __dirname,
};

function getFilesTogZip(options) {
  var _options$pattern = options.pattern,
    pattern =
      _options$pattern === void 0 ? defaultOptions.pattern : _options$pattern,
    _options$globOptions = options.globOptions,
    globOptions =
      _options$globOptions === void 0
        ? defaultOptions.globOptions
        : _options$globOptions;
  var cwd = globOptions.cwd;
  var Files = glob.sync(pattern, {
    cwd: cwd,
  });
  return Files;
}

export default main;
//# sourceMappingURL=gzippalo.esm.js.map
