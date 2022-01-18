import childProcess from 'child_process'
import fse from 'fs-extra'

const build = async () => {
  try {
    // Remove current build
    console.info(
      `${new Date().toISOString()} Removing previous build if exist ...`,
    )
    await remove('./build/')
    console.info(
      `${new Date().toISOString()} Removed previous build if exist\n`,
    )

    // Compile scss file
    console.info(`${new Date().toISOString()} Compiling scss file ...`)
    await exec('npm run build:scss', './')
    console.info(`${new Date().toISOString()} Completed compiling scss file\n`)

    // Copy front-end files
    console.info(`${new Date().toISOString()} Copying front-end files ...`)
    await copy('./src/views', './build/views')
    console.info(`${new Date().toISOString()} Copied front-end files\n`)

    // Compile back-end files
    console.info(`${new Date().toISOString()} Compiling back-end files ...`)

    // remove index temp typescript from src
    await remove(`./src/temp-build/`)
    // Create temp directory for build
    await makeDir(`./src/temp-build`)
    // Create new temp file for build
    await write(`./src/temp-build/index.temp.ts`, '')
    // Append module alias import
    await appendText(
      `./src/temp-build/index.temp.ts`,
      `import 'module-alias/register'\n`,
    )
    // Append index
    await appendText(
      `./src/temp-build/index.temp.ts`,
      await readFile(`./src/index.ts`),
    )

    // Compile typesript
    await exec('tsc --build tsconfig.prod.json', './')

    // remove index.js from build
    await remove(`./build/index.js`)
    // rename temp to index
    await move(`./build/temp-build/index.temp.js`, `./build/index.js`)
    // remove temp folder from src
    await remove(`./src/temp-build/`)
    // remove temp folder from build
    await remove(`./build/temp-build/`)

    console.info(`${new Date().toISOString()} Compiled back-end files`)
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

function move(src: string, dest: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.move(src, dest, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function makeDir(target: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.mkdir(target, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function write(target: string, text: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.writeFile(target, text, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function appendText(dest: string, text: string): Promise<void> {
  return new Promise((res, rej) => {
    return fse.appendFile(dest, text, (err) => {
      return !!err ? rej(err) : res()
    })
  })
}

function readFile(dest: string): Promise<string> {
  return new Promise((res, rej) => {
    return fse.readFile(dest, 'utf8', (err, data) => {
      return !!err ? rej(err) : res(data)
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
