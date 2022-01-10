import childProcess from 'child_process'
import fse from 'fs-extra'

const build = async () => {
  try {
    // Remove current build
    console.info(`Removing previous build if exist ...`)
    await remove('./build/')
    console.info(`Removed previous build if exist\n`)

    // Compile scss file
    console.info(`Compiling scss file ...`)
    await exec('npm run build:scss', './')
    console.info(`Completed compiling scss file\n`)

    // Copy front-end files
    console.info(`Copying front-end files ...`)
    await copy('./src/views', './build/views')
    console.info(`Copied front-end files\n`)

    // Compile back-end files
    console.info(`Compiling back-end files ...`)
    await exec('tsc --build tsconfig.prod.json', './')
    console.info(`Compiled back-end files`)
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
