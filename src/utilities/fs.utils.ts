import fse from 'fs-extra'
import Async from 'async'

// Make sure directory exist, if not exist will create one
const ensureDir = (path: string) => {
  return fse.ensureDir(path);
};

// Move or rename file or folder
const moveOrRename = (src_path: string, dest_path: string) => {
  return fse.move(src_path, dest_path);
};

// Delete one file of folder
const deleteOne = async (path: string) => {
  if (fse.existsSync(path)) {
    await fse.remove(path);
  }
};

// Delete multiple file or folder
const deleteMultiTempUpload = async (paths: string[]) => {
  await Async.each(paths, async (path, cb) => {
    if (fse.existsSync(path)) {
      await fse.remove(path);
    }
    cb();
  });
};

const fsUtils = {
  ensureDir,
  moveOrRename,
  deleteOne,
  deleteMultiTempUpload,
};

export default fsUtils;