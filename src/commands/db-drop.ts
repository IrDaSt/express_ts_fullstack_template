/* eslint-disable no-console */
import childProcess from "child_process"
import fse from "fs-extra"
import cliProgress from "cli-progress"

const progress = new cliProgress.SingleBar(
  {},
  cliProgress.Presets.shades_classic,
)

const dbDrop = async () => {
  try {
    // Reset database
    console.info(`Reset databases`)
    const migrationFolders = await getDirectories("./src/database/migration")
    progress.start(migrationFolders.length, 0)
    for (const folder of migrationFolders) {
      const configFilePath = `./src/constants/database/${folder}.ts`
      if (!fse.existsSync(configFilePath)) {
        console.error("Could not find config file path: " + configFilePath)
        continue
      }

      console.info(` | Dropping ${folder} database`)
      await exec(
        `cross-var npm run typeorm schema:drop -- -d ${configFilePath}`,
        "./",
      )

      progress.increment()
    }
    console.info(`Finished`)
    progress.stop()
  } catch (error) {
    console.error(error)
  }
}

const getDirectories = async (path: fse.PathLike) =>
  (await fse.readdir(path, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)

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

dbDrop()
