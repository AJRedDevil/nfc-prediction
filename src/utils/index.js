import fs from 'fs';

const DIRECTORY = 'downloads';

const write = (filename, content, cb) => {
  const fp = `${DIRECTORY}/${filename}.json`;
  fs.writeFile(fp, JSON.stringify(content), 'utf-8', err => {
    if (err) cb(err);
  });
};

const read = filename => {
  const fp = `${DIRECTORY}/${filename}.json`;
  if (fs.existsSync(fp)) {
    const data = fs.readFileSync(fp, 'utf-8');
    return {
      success: true,
      data: JSON.parse(data),
    };
  } else {
    return {
      success: false,
      message: 'File not found!',
    };
  }
};

const readDir = subdir => {
  const directory = `${DIRECTORY}/${subdir}`;
  const files = fs.readdirSync(directory, 'utf-8');
  return files;
};

module.exports = {
  write,
  read,
  readDir,
};
