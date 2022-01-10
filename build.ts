import childProcess from 'child_process'
import fse from 'fs-extra'

const build = async () => {
  try {
    // Remove current build
    await remove('./build/')
    await exec('npm run build:scss', './')
    // Copy front-end files
    await copy('./src/public', './build/public')
    await copy('./src/views', './build/views')
    // Copy production env file
    await copy('.env', './build/.env')
    // Copy back-end files
    await exec('tsc --build tsconfig.prod.json', './')
  } catch (error) {
    console.error(error)
  }
}

function remove(loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.remove(loc, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function copy(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.copy(src, dest, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function exec(cmd: string, loc: string): Promise<void> {
  return new Promise((res, rej) => {
    return childProcess.exec(cmd, { cwd: loc }, (err, stdout, stderr) => {
      if (!!stdout) {
        console.info(stdout)
      }
      if (!!stderr) {
        console.warn(stderr)
      }
      return !!err ? rej(err) : res()
    })
  })
}

build()
