import { pipeline } from 'stream';
import glob from 'glob';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';

import zlib from 'zlib'; // native node_modules didn't know about that

const { createGzip } = zlib;

const pipe = promisify(pipeline);

async function doGzip(inputPath: string, outputPath: string) {
  const gzip = createGzip();
  const source = createReadStream(inputPath);
  const destination = createWriteStream(outputPath);
  await pipe(source, gzip, destination);
}

const defaultOptions = {
  globOptions: {
    cwd: __dirname,
  },
  pattern: '*',
  updateInline: true,
  debug: false,
  destination: __dirname,
};

interface IOptions {
  globOptions: glob.IOptions;
  pattern?: string;
  updateInline?: boolean;
  destination?: string;
}

function getFilesTogZip(options: IOptions) {
  const {
    pattern = defaultOptions.pattern,
    globOptions = defaultOptions.globOptions,
  } = options;
  const { cwd } = globOptions;
  const Files = glob.sync(pattern, {
    cwd,
  });
  return Files;
}

interface IGzipFiles {
  files: string[];
  options: IOptions;
}
async function gZipFiles({ files, options }: IGzipFiles) {
  if (files) {
    const { destination, globOptions = defaultOptions.globOptions } = options;
    const { cwd } = globOptions;
    files.forEach(async each => {
      const pathToCheckAndUpdate = path.join(cwd || __dirname, each);
      let finaldestination = pathToCheckAndUpdate;
      if (destination) {
        finaldestination = destination;
      }
      await doGzip(pathToCheckAndUpdate, `${finaldestination}.gz`);
    });
  }
}

async function main(options: IOptions) {
  const Files = getFilesTogZip(options);
  await gZipFiles({
    files: Files,
    options,
  });
}

module.exports = main;
