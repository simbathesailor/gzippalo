import gzippalo from '../src';
import fs from 'fs';
import path from 'path';

afterEach(() => {
  console.log('I am done ');
});
describe('gzip file generation suite', () => {
  it('input.js.gz file get generated', () => {
    gzippalo({
      pattern: '*.js?(.map)',
      globOptions: {
        cwd: `${__dirname}`,
      },
    });

    const A = fs.existsSync(path.join(__dirname, 'input.js.gz'));
    expect(A).toBe(true);
    fs.unlinkSync(path.join(__dirname, 'input.js.gz'));
  });
});
