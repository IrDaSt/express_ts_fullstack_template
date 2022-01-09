import multer from 'multer'
import path from 'path'

// Handle file upload temporary location
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/data/uploads/temp')
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})

const upload = multer({ storage: storage })

export default upload
