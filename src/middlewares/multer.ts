import multer from "multer"
import path from "path"
import fse from "fs-extra"
import idGeneratorUtils from "@utilities/id-generator.utils"

// Handle file upload temporary location
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fse.ensureDir("./public/data/uploads/temp")
    cb(null, "./public/data/uploads/temp")
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${idGeneratorUtils.generateUUIDV4()}` +
        `-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

const upload = multer({ storage: storage })

export default upload
