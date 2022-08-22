/* eslint-disable @typescript-eslint/no-unsafe-return */
const strthenparse: <T>(data: T) => T = (data) =>
  JSON.parse(JSON.stringify(data))

const jsonUtils = {
  strthenparse,
}
export default jsonUtils
